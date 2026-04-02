import { pgEnum } from "drizzle-orm/pg-core";

// Role enum
export const customerRoleEnum = pgEnum("customer_role", [
  "customer",
  "agent",
  "mbo",
  "guarantor",
]);

// Status enum
export const customerStatusEnum = pgEnum("customer_status", [
  "approved",
  "denied",
  "pending"
]);