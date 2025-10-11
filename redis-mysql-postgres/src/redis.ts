import { createClient, type RedisClientType } from "redis"

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1"
const REDIS_PORT = process.env.REDIS_PORT || "6379"
const REDIS_URL: string = `redis://${REDIS_HOST}:${REDIS_PORT}`

class RedisConnector implements AsyncDisposable {
    private client: RedisClientType
    private isConnected: boolean = false
    private static registry = new FinalizationRegistry((cleanup: () => void) => {
        console.log("ガベージコレクション時にRedis接続をクリーンアップしています");
        cleanup();
    });

    constructor() {
        this.client = createClient({ url: REDIS_URL })
        
        // ガベージコレクション時のクリーンアップを登録
        RedisConnector.registry.register(this, () => {
            if (this.isConnected) {
                // 同期的なクリーンアップ（非推奨だが、GC時なので仕方ない）
                this.client.disconnect();
                this.isConnected = false;
            }
        });
    }

    async connect() {
        if (!this.isConnected) {
            await this.client.connect()
            this.isConnected = true
        }
    }

    getClient() {
        if (!this.isConnected) {
            throw new Error("Redis client is not connected")
        }
        return this.client
    }

    // 明示的なクリーンアップメソッド
    async quit() {
        if (this.client && this.isConnected) {
            await this.client.quit()
            this.isConnected = false
        }
    }

    // Symbol.asyncDispose の実装（デストラクタ的機能）
    async [Symbol.asyncDispose]() {
        await this.quit()
    }

    async dispose() {
        await this.quit()
    }
}

export { RedisConnector }
