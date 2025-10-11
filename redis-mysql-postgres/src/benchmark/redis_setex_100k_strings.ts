import { RedisConnector } from "@/redis.ts";
import { BenchmarkResult } from "./schemas";
import BaseBenchmark from "./base_benchmark";

export default class RedisSetex100kStringsBenchmark extends BaseBenchmark
{
    /** ベンチマークの名前 */
    readonly NAME: string = "Redisに10万件の文字列を追加(setex)";

    /**
     * Redisに10万件の文字列を追加するベンチマーク
     * @returns Promise<BenchmarkResult>
     */
    override async run(): Promise<BenchmarkResult> {
        this.result = new BenchmarkResult(this.NAME, 0, false);
        try {
            // using文を使用すると、ブロック終了時に自動的に[Symbol.asyncDispose]が呼ばれる
            await using conn = new RedisConnector();
            await conn.connect();
            const client = conn.getClient();

            const startTime = Date.now();
            const multi = client.multi();
            const keys = Array<string>();
            for (let i = 1; i <= 1000 * 100; i++) {
                const key = `IntTest:${i}`;
                multi.setEx(key, 10, i.toString());
                keys.push(key);
            }
            await multi.exec();
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;

            let verified = true;
            const sampleKeys = ['IntTest:1', 'IntTest:50000', 'IntTest:100000'];
            for (const key of sampleKeys) {
                const value = await client.get(key);
                if (value === null) {
                    verified = false;
                    break;
                }
            }

            // 使い終わった値を削除する
            multi.del(keys);
            await multi.exec();

            this.result.elapsedTime = elapsedTime;
            this.result.success = verified;
        } catch (error) {
            console.error("Error during benchmark:", error);
        }
        return this.result;
    }
}