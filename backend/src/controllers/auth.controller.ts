import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { registerSchema, loginSchema } from "../validators/user.validator";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);
    const result = await userService.registerUser(validatedData);
    res.status(201).json(result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);
    const result = await userService.loginUser(validatedData);
    res.status(200).json(result);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const result = await userService.getUserById(userId);
    res.status(200).json(result);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const result = await userService.updateUser(userId, req.body);
    res.status(200).json(result);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
});
