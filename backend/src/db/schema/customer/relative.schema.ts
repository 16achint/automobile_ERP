import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.schema";

export const customerRelatives = pgTable("customer_relatives", {
  id: text("id").primaryKey(), // UUID

  customerId: text("customer_id")
    .references(() => customers.id, { onDelete: "cascade" })
    .notNull(),

  name: text("name").notNull(),
  relationType: text("relation_type"), // father, brother, wife, etc.
  address: text("address"),
  city: text("city"),
  district: text("district"),
  post: text("post"),
  tehsil: text("tehsil"),
  mobileNumber: varchar("mobile_number", { length: 15 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});