import RedisSet100kStringsBenchmark from "@/benchmark/redis_set_100k_strings";
import RedisSetex100kStringsBenchmark from "@/benchmark/redis_setex_100k_strings";
import MysqlUpsert100kStringsBenchmark from "@/benchmark/mysql_upsert_100k_strings";
import PostgresUpsert100kStringsBenchmark from "@/benchmark/postgres_upsert_100k_strings";
import { type BenchmarkResult } from "@/benchmark/schemas";
import type BaseBenchmark from "@/benchmark/base_benchmark";
import { closePool as closeMysqlPool } from "@/mysql/db";
import { closeConnection as closePostgresConnection } from "@/postgres/db";

const results = new Array<BenchmarkResult>();

async function run(benchmark: BaseBenchmark) {
    console.log(`Running benchmark: ${benchmark.NAME}...`);
    const result = await benchmark.run();
    results.push(result);
}

async function dispose() {
    await closeMysqlPool();
    await closePostgresConnection();
}

// プロセス終了時のクリーンアップ処理を登録
process.on('exit', async () => {
    await dispose();
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT, cleaning up...');
    await dispose();
    process.exit(130); // SIGINT の標準的な終了コード
});

async function main(): Promise<number> {
    let ret = 0;

    try {
        // コマンドライン引数の解析
        const args = process.argv.slice(2);
        const filterIndex = args.indexOf('--filter');
        const filterValue = filterIndex !== -1 && filterIndex + 1 < args.length ? args[filterIndex + 1] : null;

        const benchmarks: Array<BaseBenchmark> = [
            new RedisSet100kStringsBenchmark(),
            new RedisSetex100kStringsBenchmark(),
            new MysqlUpsert100kStringsBenchmark(),
            new PostgresUpsert100kStringsBenchmark(),
        ];

        // フィルタリング処理
        const filteredBenchmarks = filterValue 
            ? benchmarks.filter(benchmark => benchmark.NAME.includes(filterValue))
            : benchmarks;

        if (filteredBenchmarks.length === 0) {
            console.log(`No benchmarks found matching filter: "${filterValue}"`);
            await dispose();
            return 1; // エラー終了コード
        }

        console.log(`Running ${filteredBenchmarks.length} benchmark(s)...`);
        if (filterValue) {
            console.log(`Filter: "${filterValue}"`);
        }

        for (const benchmark of filteredBenchmarks) {
            await run(benchmark);
        }

        // 結果表示とエラーチェック
        let hasFailures = false;
        for (const result of results) {
            console.log(`${result.name}, ${result.elapsedTime} ms, success: ${result.success}`);
            if (!result.success) {
                hasFailures = true;
            }
        }
        
        // ベンチマークが失敗した場合は非ゼロで終了
        ret = hasFailures ? 1 : 0;
        
    } catch (error) {
        console.error('Unexpected error:', error);
        ret = 2; // 予期しないエラーの終了コード
    }

    return ret;
}

const exitCode = await main();
process.exit(exitCode);