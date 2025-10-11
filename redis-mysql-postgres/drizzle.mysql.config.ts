import type { Config } from "drizzle-kit";
import { HOST, USER, PASSWORD, DATABASE, PORT } from "./src/mysql/db.ts";

const db_url = `mysql://${USER}:****@${HOST}:${PORT}/${DATABASE}`;
console.log(`Connect To MySQL: ${db_url}`);

export default {
  schema: "./src/mysql/schema.ts",
  out: "./drizzle/mysql",
  dialect: "mysql",
  dbCredentials: {
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  },
} satisfies Config;
