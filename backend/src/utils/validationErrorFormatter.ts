import { ZodError, ZodIssue } from "zod";

export const formatValidationErrors = (error: ZodError) => {
    // Group errors by field and keep only the first error per field
    const errorMap: Record<string, string> = {};

    error.issues.forEach((err: ZodIssue) => {
        const field = err.path.join(".") || "unknown";
        // Only add if this field doesn't already have an error
        if (!errorMap[field]) {
            errorMap[field] = err.message;
        }
    });

    return {
        success: false,
        message: "Validation failed",
        errors: errorMap,
    };
};
