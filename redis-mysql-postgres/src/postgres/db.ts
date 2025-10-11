import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const HOST = process.env.POSTGRES_HOST || "127.0.0.1";
const USER = process.env.POSTGRES_USER || "benchmark";
const PASSWORD = process.env.POSTGRES_PASSWORD || "password";
const DATABASE = process.env.POSTGRES_DATABASE || "benchmark";
const PORT = Number(process.env.POSTGRES_PORT || 5432);

// PostgreSQL接続文字列を構築
const connectionString = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

// postgres.jsクライアントを作成
const client = postgres(connectionString, {
    max: 10, // 最大接続数
    idle_timeout: 20, // アイドルタイムアウト（秒）
    connect_timeout: 60, // 接続タイムアウト（秒）
});

export const db = drizzle(client, { schema });

// 接続の状態管理
let isConnectionClosed = false;

// 接続を閉じる関数
export async function closeConnection() {
    if (!isConnectionClosed) {
        try {
            await client.end();
            isConnectionClosed = true;
        } catch (error) {
            console.error("Error closing PostgreSQL connection:", error);
        }
    }
}

export { HOST, USER, PASSWORD, DATABASE, PORT };