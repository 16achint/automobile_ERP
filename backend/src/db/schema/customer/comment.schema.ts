import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.schema";

export const customerComments = pgTable("customer_comments", {
  id: text("id").primaryKey(), // UUID

  customerId: text("customer_id")
    .references(() => customers.id, { onDelete: "cascade" })
    .notNull(),

  comment: text("comment").notNull(),
  createdBy: text("created_by"), // user name or id
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});