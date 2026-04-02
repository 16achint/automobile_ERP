import { z } from "zod";

// ENUMS
export const roleEnum = z.enum(["customer", "agent", "mbo", "guarantor"]);
export const statusEnum = z.enum(["approved", "denied"]);

// Nested Schemas
const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().optional(),
  district: z.string().optional(),
  post: z.string().optional(),
  tehsil: z.string().optional(),
});

const contactSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .optional(),
  mobileRemark: z.string().optional(),
  whatsappNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "WhatsApp number must be 10 digits")
    .optional(),
  whatsappRemark: z.string().optional(),
});

const documentSchema = z.object({
  documentType: z.enum([
    "aadhaar_front",
    "aadhaar_back",
    "passport_photo",
    "pan_card",
  ]),
  fileUrl: z.string().url("File URL must be valid"),
});

const relativeSchema = z.object({
  name: z.string().min(1, "Relative name is required"),
  relationType: z.string().optional(),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  post: z.string().optional(),
  tehsil: z.string().optional(),
});

const commentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  createdBy: z.string().optional(),
});

const activityLogSchema = z.object({
  fieldChanged: z.string().optional(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  changedBy: z.string().optional(),
});

// CREATE CUSTOMER
export const createCustomerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  aadhaarNumber: z
    .string()
    .length(12, "Aadhaar must be 12 digits")
    .regex(/^[0-9]+$/, "Aadhaar must be numeric"),
  role: roleEnum,
  status: statusEnum.optional(),
  city: z.string().optional(),
  addresses: z.array(addressSchema).optional(),
  contacts: z.array(contactSchema).optional(),
  documents: z.array(documentSchema).optional(),
  relatives: z.array(relativeSchema).optional(),
});

// UPDATE CUSTOMER
export const updateCustomerSchema = z.object({
  fullName: z.string().min(1, "Full name is required").optional(),
  aadhaarNumber: z
    .string()
    .length(12, "Aadhaar must be 12 digits")
    .regex(/^[0-9]+$/, "Aadhaar must be numeric")
    .optional(),
  role: roleEnum.optional(),
  status: statusEnum.optional(),
  city: z.string().optional(),
  addresses: z.array(addressSchema).optional(),
  contacts: z.array(contactSchema).optional(),
  documents: z.array(documentSchema).optional(),
  relatives: z.array(relativeSchema).optional(),
  comments: z.array(commentSchema).optional(),
  activityLogs: z.array(activityLogSchema).optional(),
}).strict();