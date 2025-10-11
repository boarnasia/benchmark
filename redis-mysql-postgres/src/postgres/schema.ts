import { pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const bench1 = pgTable("bench1", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 255 }).notNull(),
});