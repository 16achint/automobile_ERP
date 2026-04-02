import { Request, Response } from "express";
import * as customerService from "../services/customer.service";
import { createCustomerSchema, updateCustomerSchema } from "../validators/customer.validator";
import { asyncHandler } from "../utils/asyncHandler";

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createCustomerSchema.parse(req.body);
    const result = await customerService.createCustomer(validatedData);
    res.status(201).json(result);
});

export const getCustomers = asyncHandler(async (_req: Request, res: Response) => {
    const result = await customerService.getCustomers();
    res.status(200).json(result);
});

export const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
    const result = await customerService.getCustomerById(req.params.id as string);
    res.status(200).json(result);
});

export const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = updateCustomerSchema.parse(req.body);
    const result = await customerService.updateCustomer(req.params.id as string, validatedData);
    res.status(200).json(result);
});

export const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
    const result = await customerService.deleteCustomer(req.params.id as string);
    res.status(200).json(result);
});
