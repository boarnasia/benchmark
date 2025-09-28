"""
results/*.csvを読み込みサマリを出力する
"""


import csv
import statistics
from pathlib import Path
from rich.console import Console
from rich.table import Table
from rich import box

def read_csv_data(file_path):
    """CSVファイルを読み込み、データを返す"""
    data = []
    with open(file_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append(row)
    return data

def calculate_stats(values):
    """統計値を計算"""
    if not values:
        return {"平均": 0, "最大": 0, "最小": 0, "中央値": 0}
    
    return {
        "平均": round(statistics.mean(values), 6),
        "最大": round(max(values), 6),
        "最小": round(min(values), 6),
        "中央値": round(statistics.median(values), 6)
    }

def main():
    console = Console()
    results_dir = Path("results")
    languages = ["node", "python", "php", "rust", "java"]
    
    # データを格納するリスト
    time_data = []
    memory_data = []
    
    for lang in languages:
        # hyperfineの実行時間データ
        hf_file = results_dir / f"{lang}_hf.csv"
        if hf_file.exists():
            hf_data = read_csv_data(hf_file)
            time_values = [float(row["time_sec"]) for row in hf_data]
            time_stats = calculate_stats(time_values)
            
            time_data.append({
                "lang": lang,
                "stats": time_stats
            })
        
        # timeコマンドのメモリデータ
        time_file = results_dir / f"{lang}_time.csv"
        if time_file.exists():
            time_file_data = read_csv_data(time_file)
            memory_values = [float(row["maxrss_kb"]) for row in time_file_data]
            memory_stats = calculate_stats(memory_values)
            
            memory_data.append({
                "lang": lang,
                "stats": memory_stats
            })
    
    # 平均値で昇順ソート
    time_data.sort(key=lambda x: x["stats"]["平均"])
    memory_data.sort(key=lambda x: x["stats"]["平均"])
    
    # 実行時間テーブル
    time_table = Table(title="実行時間統計 (秒) - 平均値昇順", box=box.SIMPLE)
    time_table.add_column("言語", style="cyan")
    time_table.add_column("平均", style="green")
    time_table.add_column("最大", style="red")
    time_table.add_column("最小", style="blue")
    time_table.add_column("中央値", style="magenta")
    
    for item in time_data:
        stats = item["stats"]
        time_table.add_row(
            item["lang"],
            str(stats["平均"]),
            str(stats["最大"]),
            str(stats["最小"]),
            str(stats["中央値"])
        )
    
    # メモリ使用量テーブル
    memory_table = Table(title="メモリ使用量統計 (KB) - 平均値昇順", box=box.SIMPLE)
    memory_table.add_column("言語", style="cyan")
    memory_table.add_column("平均", style="green")
    memory_table.add_column("最大", style="red")
    memory_table.add_column("最小", style="blue")
    memory_table.add_column("中央値", style="magenta")
    
    for item in memory_data:
        stats = item["stats"]
        memory_table.add_row(
            item["lang"],
            str(stats["平均"]),
            str(stats["最大"]),
            str(stats["最小"]),
            str(stats["中央値"])
        )
    
    console.print(time_table)
    console.print()
    console.print(memory_table)

if __name__ == "__main__":
    main()