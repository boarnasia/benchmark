import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

const HOST = process.env.MYSQL_HOST || "127.0.0.1";
const USER = process.env.MYSQL_USER || "benchmark";
const PASSWORD = process.env.MYSQL_PASSWORD || "password";
const DATABASE = process.env.MYSQL_DATABASE || "benchmark";
const PORT = Number(process.env.MYSQL_PORT || 3306);

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT,
});

//export const db = drizzle(pool, { schema });
export const db = drizzle(pool, { schema, mode: "default" });

// プールの状態を管理
let isPoolClosed = false;

// 接続プールを閉じる関数
export async function closePool() {
    if (!isPoolClosed) {
        try {
            await pool.end();
            isPoolClosed = true;
        } catch (error) {
            console.error("Error closing MySQL pool:", error);
        }
    }
}

export { HOST, USER, PASSWORD, DATABASE, PORT };