import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.schema";

export const customerActivityLogs = pgTable("customer_activity_logs", {
  id: text("id").primaryKey(), // UUID

  customerId: text("customer_id")
    .references(() => customers.id, { onDelete: "cascade" })
    .notNull(),
  fieldChanged: text("field_changed"),   // e.g. "mobile_number"
  oldValue: text("old_value"),
  newValue: text("new_value"),
  changedBy: text("changed_by"),
  changedAt: timestamp("changed_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});