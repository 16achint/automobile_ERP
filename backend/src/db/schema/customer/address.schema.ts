import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.schema";

export const customerAddresses = pgTable("customer_addresses", {
  id: text("id").primaryKey(), // UUID
  customerId: text("customer_id")
    .references(() => customers.id, { onDelete: "cascade" }),

  address: text("address"),
  city: text("city"),
  district: text("district"),
  post: text("post"),
  tehsil: text("tehsil"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});