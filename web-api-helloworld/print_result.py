"""
results/*.csvを読み込みサマリを出力する
"""


import csv
import statistics
from pathlib import Path
from rich.console import Console
from rich.table import Table
from rich import box

TARGET_DIRS = [
    "go-gin",
    "java-springboot",
    "node-nestjs",
    "php-laravel",
    "php-laravel-octane",
    "python-django-async",
    "python-django-ninja",
    "python-django-sync",
    "python-fastapi-async",
    "python-fastapi-sync",
    "rust-actix",
]

TARGET_FILES =  [
    "result-ping.txt",
    "result-cpu-bound.txt",
    "result-io-bound.txt",
]

def parse_requests_per_sec(file_path: Path) -> float:
    """結果ファイルからRequests/secの値を抽出する"""
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            for line in content.split('\n'):
                if line.startswith('Requests/sec:'):
                    # "Requests/sec:  35865.02" のような形式から数値を抽出
                    return float(line.split(':')[1].strip())
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return 0.0
    return 0.0

def collect_benchmark_results() -> dict:
    """全ディレクトリから結果を集計する"""
    results = {}
    
    for dir_name in TARGET_DIRS:
        dir_path = Path(dir_name)
        if not dir_path.exists():
            print(f"Directory {dir_name} not found, skipping...")
            continue
            
        results[dir_name] = {}
        
        for file_name in TARGET_FILES:
            file_path = dir_path / file_name
            if file_path.exists():
                requests_per_sec = parse_requests_per_sec(file_path)
                results[dir_name][file_name] = requests_per_sec
            else:
                print(f"File {file_path} not found, setting to 0")
                results[dir_name][file_name] = 0.0
    
    return results

def create_comparison_table(results: dict, console: Console):
    """比較テーブルを作成して表示する"""
    table = Table(title="Web API Framework Benchmark Results (Requests/sec)", box=box.ROUNDED)
    
    # ヘッダー行を追加
    table.add_column("Framework", style="cyan", no_wrap=True)
    for file_name in TARGET_FILES:
        # ファイル名から表示用の名前を作成
        display_name = file_name.replace("result-", "").replace(".txt", "")
        table.add_column(display_name, justify="right", style="green")
    
    # 各フレームワークの結果を行として追加
    for dir_name in TARGET_DIRS:
        if dir_name in results:
            row_data = [dir_name]
            for file_name in TARGET_FILES:
                value = results[dir_name].get(file_name, 0.0)
                # 数値をフォーマットして表示（小数点以下2桁、3桁区切り）
                formatted_value = f"{value:,.2f}" if value > 0 else "N/A"
                row_data.append(formatted_value)
            table.add_row(*row_data)
        else:
            # ディレクトリが見つからない場合
            row_data = [dir_name] + ["N/A"] * len(TARGET_FILES)
            table.add_row(*row_data)
    
    console.print(table)

def create_ranking_tables(results: dict, console: Console):
    """各テストタイプでのランキングテーブルを作成"""
    console.print("\n[bold cyan]Performance Rankings[/bold cyan]")
    
    for file_name in TARGET_FILES:
        test_name = file_name.replace("result-", "").replace(".txt", "")
        
        # 各フレームワークの結果を収集
        framework_results = []
        for dir_name in TARGET_DIRS:
            if dir_name in results and file_name in results[dir_name]:
                value = results[dir_name][file_name]
                if value > 0:
                    framework_results.append((dir_name, value))
        
        # 結果を降順でソート
        framework_results.sort(key=lambda x: x[1], reverse=True)
        
        if framework_results:
            ranking_table = Table(title=f"{test_name.upper()} Test Rankings", box=box.SIMPLE_HEAD)
            ranking_table.add_column("Rank", style="yellow", width=4)
            ranking_table.add_column("Framework", style="cyan")
            ranking_table.add_column("Requests/sec", justify="right", style="green")
            ranking_table.add_column("Relative Performance", justify="right", style="magenta")
            
            # 最高性能を基準として相対性能を計算
            best_performance = framework_results[0][1]
            
            for i, (framework, req_per_sec) in enumerate(framework_results, 1):
                relative_perf = (req_per_sec / best_performance) * 100
                rank_emoji = "🥇" if i == 1 else "🥈" if i == 2 else "🥉" if i == 3 else ""
                
                ranking_table.add_row(
                    f"{i} {rank_emoji}",
                    framework,
                    f"{req_per_sec:,.2f}",
                    f"{relative_perf:.1f}%"
                )
            
            console.print(ranking_table)

def analyze_performance_categories(results: dict, console: Console):
    """性能カテゴリ別の分析"""
    console.print("\n[bold cyan]Performance Analysis by Category[/bold cyan]")
    
    # 各フレームワークの平均性能を計算
    framework_averages = {}
    for dir_name in TARGET_DIRS:
        if dir_name in results:
            valid_values = []
            for file_name in TARGET_FILES:
                value = results[dir_name].get(file_name, 0.0)
                if value > 0:
                    valid_values.append(value)
            
            if valid_values:
                framework_averages[dir_name] = statistics.mean(valid_values)
    
    # 全体ランキング
    overall_ranking = sorted(framework_averages.items(), key=lambda x: x[1], reverse=True)
    
    overall_table = Table(title="Overall Performance Ranking (Average across all tests)", box=box.DOUBLE_EDGE)
    overall_table.add_column("Rank", style="yellow", width=4)
    overall_table.add_column("Framework", style="cyan")
    overall_table.add_column("Average Req/sec", justify="right", style="green")
    overall_table.add_column("Category", justify="center", style="bright_blue")
    
    for i, (framework, avg_perf) in enumerate(overall_ranking, 1):
        # 性能カテゴリを分類
        if avg_perf > 10000:
            category = "🚀 High Performance"
            category_style = "bright_green"
        elif avg_perf > 1000:
            category = "⚡ Good Performance"
            category_style = "green"
        elif avg_perf > 100:
            category = "📈 Moderate Performance"
            category_style = "yellow"
        else:
            category = "🐌 Low Performance"
            category_style = "red"
        
        rank_emoji = "🥇" if i == 1 else "🥈" if i == 2 else "🥉" if i == 3 else ""
        
        overall_table.add_row(
            f"{i} {rank_emoji}",
            framework,
            f"{avg_perf:,.2f}",
            f"[{category_style}]{category}[/{category_style}]"
        )
    
    console.print(overall_table)

def print_summary_statistics(results: dict, console: Console):
    """各テストタイプの統計情報を表示する"""
    console.print("\n[bold cyan]Summary Statistics[/bold cyan]")
    
    for file_name in TARGET_FILES:
        test_name = file_name.replace("result-", "").replace(".txt", "")
        values = []
        
        for dir_name in TARGET_DIRS:
            if dir_name in results and file_name in results[dir_name]:
                value = results[dir_name][file_name]
                if value > 0:
                    values.append(value)
        
        if values:
            avg = statistics.mean(values)
            median = statistics.median(values)
            max_val = max(values)
            min_val = min(values)
            
            stats_table = Table(title=f"{test_name} Statistics", box=box.SIMPLE)
            stats_table.add_column("Metric", style="cyan")
            stats_table.add_column("Value", justify="right", style="green")
            
            stats_table.add_row("Average", f"{avg:,.2f}")
            stats_table.add_row("Median", f"{median:,.2f}")
            stats_table.add_row("Maximum", f"{max_val:,.2f}")
            stats_table.add_row("Minimum", f"{min_val:,.2f}")
            
            console.print(stats_table)
        else:
            console.print(f"[red]No valid data found for {test_name}[/red]")

def main():
    console = Console()
    
    console.print("[bold blue]Web API Framework Benchmark Results Analyzer[/bold blue]\n")
    
    # 結果を集計
    results = collect_benchmark_results()
    
    if not results:
        console.print("[red]No results found![/red]")
        return
    
    # 比較テーブルを表示
    create_comparison_table(results, console)
    
    # ランキングテーブルを表示
    create_ranking_tables(results, console)
    
    # 性能カテゴリ分析を表示
    analyze_performance_categories(results, console)
    
    # 統計情報を表示
    print_summary_statistics(results, console)

if __name__ == "__main__":
    main()