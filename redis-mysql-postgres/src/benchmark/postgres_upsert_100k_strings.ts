import { db } from "@/postgres/db";
import { bench1 } from "@/postgres/schema";
import { sql, eq } from "drizzle-orm";
import { BenchmarkResult } from "./schemas";
import BaseBenchmark from "./base_benchmark";

export default class PostgresUpsert100kStringsBenchmark extends BaseBenchmark
{
    /** ベンチマークの名前 */
    readonly NAME: string = "PostgreSQLに10万件の文字列を追加(upsert)";

    /**
     * PostgreSQLに10万件の文字列をUpsert（挿入または更新）するベンチマーク
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
                
                // PostgreSQL Upsert - onConflictDoUpdate を使用
                await db.insert(bench1)
                    .values(values)
                    .onConflictDoUpdate({
                        target: bench1.id,
                        set: { value: sql.raw(`excluded.${bench1.value.name}`) }
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