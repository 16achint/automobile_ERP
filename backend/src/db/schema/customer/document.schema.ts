import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.schema";

export const customerDocuments = pgTable("customer_documents", {
  id: text("id").primaryKey(), // UUID

  customerId: text("customer_id")
    .references(() => customers.id, { onDelete: "cascade" })
    .notNull(),

  documentType: text("document_type").notNull(),
  // e.g. aadhaar_front, aadhaar_back, passport_photo

  fileUrl: text("file_url").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});