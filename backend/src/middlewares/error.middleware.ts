import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    // Zod validation errors → 400
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues,
        });
    }

    // Custom errors with a statusCode property → use that code
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? "Internal server error" : err.message || "Something went wrong",
    });
};
