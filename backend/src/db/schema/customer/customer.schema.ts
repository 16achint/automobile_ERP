import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { customerRoleEnum, customerStatusEnum } from "./enums";

export const customers = pgTable("customers", {
  id: text("id").primaryKey(), // UUID

  fullName: text("full_name").notNull(),
  aadhaarNumber: varchar("aadhaar_number", { length: 12 }).unique(),

  role: customerRoleEnum("role").notNull(),

  status: customerStatusEnum("status").default("pending"),

  city: text("city"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});