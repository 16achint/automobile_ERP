import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(1, "Mobile is required").regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),
    email: z.string().email("Invalid email format"),
    address: z.string().optional(),
    bikeModel: z.string().optional(),
    purchaseDate: z.string().optional(),
    modeOfPayment: z.string().optional(),
    cash: z.string().optional(),
    credit: z.string().optional(),
    creditor: z.boolean().optional(),
    promiseDate: z.string().nullable().optional(),
    priceByCustomer: z.number().optional(),
    premiumAmount: z.string().optional(),
    priceDifference: z.string().optional(),
});

export const updateCustomerSchema = z.object({
    name : z.string().min(1,"Name is required").optional(),
    mobile: z.string().min(1,"Mobile is Required").regex(/^\d{10}$/,"Mobile must be exact 10 digits").optional(),
    email: z.string().email("Invalid email format").optional(),
    address: z.string().optional(),
    bikeModel: z.string().optional(),
    purchaseDate: z.string().optional(),
    modeOfPayment: z.string().optional(),
    cash: z.string().optional(),
    credit: z.string().optional(),
    creditor: z.boolean().optional(),
    promiseDate: z.string().nullable().optional(),
    priceByCustomer: z.number().optional(),
    premiumAmount: z.string().optional(),
    priceDifference: z.string().optional(),
}).strict();
