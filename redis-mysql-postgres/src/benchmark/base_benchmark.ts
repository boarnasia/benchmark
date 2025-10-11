import { BenchmarkResult } from "./schemas";


export default abstract class BaseBenchmark
{
    /** ベンチマークの名前 */
    abstract readonly NAME: string;

    /** ベンチマークの結果 */
    result: BenchmarkResult | null = null;

    abstract run(): Promise<BenchmarkResult>;
}