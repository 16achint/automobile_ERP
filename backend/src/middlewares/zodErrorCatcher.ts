import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formatValidationErrors } from "../utils/validationErrorFormatter";

export const zodErrorCatcher = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Check if it's a ZodError instance
    if (err instanceof ZodError) {
        console.log("✅ Caught ZodError instance");
        return res.status(400).json(formatValidationErrors(err));
    }

    // Check for .name === 'ZodError'
    if (err.name === "ZodError" && err.issues) {
        console.log("✅ Caught ZodError by name");
        const errorMap: Record<string, string> = {};
        err.issues.forEach((issue: any) => {
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

    // Check if error message contains ZodError info
    if (err.message?.includes("ZodError")) {
        console.log("✅ Caught ZodError from message");
        const match = err.message.match(/\[([\s\S]*?)\]/);
        if (match) {
            try {
                const errors = JSON.parse(`[${match[1]}]`);
                const errorMap: Record<string, string> = {};
                errors.forEach((issue: any) => {
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
            } catch (e) {
                // If parsing fails, pass to next handler
            }
        }
    }

    console.log("❌ Passing error to next handler");
    next(err);
};
