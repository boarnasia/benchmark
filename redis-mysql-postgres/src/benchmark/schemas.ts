/**
 * @class BenchmarkResult
 * @description ベンチマークの結果を表すクラス
 * @property {string} name - ベンチマークの名前
 * @property {number} elapsedTime - ベンチマークの実行時間（ミリ秒）
 * @property {boolean} success - ベンチマークが成功したかどうか
 */
class BenchmarkResult {
    constructor(
        public name: string,
        public elapsedTime: number,
        public success: boolean,
    ) {}
}

export {
    BenchmarkResult
}