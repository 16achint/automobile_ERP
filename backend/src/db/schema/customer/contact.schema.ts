import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.schema";

export const customerContacts = pgTable("customer_contacts", {
  id: text("id").primaryKey(), // UUID

  customerId: text("customer_id")
    .references(() => customers.id, { onDelete: "cascade" })
    .notNull(),

  mobileNumber: varchar("mobile_number", { length: 15 }),
  mobileRemark: text("mobile_remark"),

  whatsappNumber: varchar("whatsapp_number", { length: 15 }),
  whatsappRemark: text("whatsapp_remark"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});