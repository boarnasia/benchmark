import { mysqlTable, varchar, int, serial } from "drizzle-orm/mysql-core";

export const bench1 = mysqlTable("bench1", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 255 }).notNull(),
});