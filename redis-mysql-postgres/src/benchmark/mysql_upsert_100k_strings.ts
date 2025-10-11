import { db } from "@/mysql/db";
import { bench1 } from "@/mysql/schema";
import { sql, eq } from "drizzle-orm";
import { BenchmarkResult } from "./schemas";
import BaseBenchmark from "./base_benchmark";

export default class MysqlUpsert100kStringsBenchmark extends BaseBenchmark
{
    /** ベンチマークの名前 */
    readonly NAME: string = "MySQLに10万件の文字列を追加(upsert)";

    /**
     * MySQLに10万件の文字列をUpsert（挿入または更新）するベンチマーク
     * @returns Promise<BenchmarkResult>
     */
    override async run(): Promise<BenchmarkResult> {
        this.result = new BenchmarkResult(this.NAME, 0, false);
        try {
            const startTime = Date.now();
            
            // バッチサイズを設定してメモリ使用量を削減
            const batchSize = 50000;
            const totalRecords = 100000;
            
            for (let offset = 0; offset < totalRecords; offset += batchSize) {
                const currentBatchSize = Math.min(batchSize, totalRecords - offset);
                const values = Array.from({ length: currentBatchSize }, (_, i) => ({
                    value: `IntTest:${offset + i + 1}`
                }));
                
                // MySQL Upsert - バッチごとに実行
                await db.insert(bench1)
                    .values(values)
                    .onDuplicateKeyUpdate({
                        set: { value: sql`values(${bench1.value})` }
                    });
            }
            
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;

            // データが正しく挿入されているかサンプル検証
            let verified = true;
            const sampleValues = ['IntTest:1', 'IntTest:50000', 'IntTest:100000'];
            for (const sampleValue of sampleValues) {
                const result = await db.select()
                    .from(bench1)
                    .where(eq(bench1.value, sampleValue))
                    .limit(1);
                
                if (result.length === 0) {
                    verified = false;
                    break;
                }
            }

            // テストデータをクリーンアップ
            await db.delete(bench1);

            this.result.elapsedTime = elapsedTime;
            this.result.success = verified;
        } catch (error) {
            console.error("Error during benchmark:", error);
        }
        return this.result;
    }
}