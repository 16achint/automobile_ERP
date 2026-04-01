import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formatValidationErrors } from "./validationErrorFormatter";

export const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            // Handle Zod validation errors immediately
            if (error instanceof ZodError) {
                return res.status(400).json(formatValidationErrors(error));
            }

            // Pass other errors to error handler middleware
            next(error);
        });
    };
