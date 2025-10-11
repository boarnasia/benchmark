import type { Config } from "drizzle-kit";
import { HOST, USER, PASSWORD, DATABASE, PORT } from "./src/postgres/db.ts";

const db_url = `postgresql://${USER}:****@${HOST}:${PORT}/${DATABASE}`;
console.log(`Connect To PostgreSQL: ${db_url}`);

export default {
  schema: "./src/postgres/schema.ts",
  out: "./drizzle/postgres",
  dialect: "postgresql",
  dbCredentials: {
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  },
} satisfies Config;