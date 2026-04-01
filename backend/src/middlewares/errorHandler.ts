import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formatValidationErrors } from "../utils/validationErrorFormatter";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error caught:", err);

    // Handle Zod validation errors
    if (err instanceof ZodError) {
        console.log("Detected ZodError instance");
        return res.status(400).json(formatValidationErrors(err));
    }

    // Handle errors with .errors property (Zod serialized)
    if (err.errors && Array.isArray(err.errors) && err.errors[0]?.code) {
        console.log("Detected Zod serialized error");
        const errorMap: Record<string, string> = {};
        err.errors.forEach((issue: any) => {
            const field = issue.path?.[0] || "unknown";
            if (!errorMap[field]) {
                errorMap[field] = issue.message;
            }
        });
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errorMap,
        });
    }

    // Handle other errors
    return res.status(500).json({
        success: false,
        message: err.message || "Internal server error",
    });
};
