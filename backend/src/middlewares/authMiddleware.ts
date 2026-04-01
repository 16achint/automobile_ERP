import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - No token provided",
        });
    }

    const verification = userService.verifyToken(token);

    if (!verification.valid) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token",
        });
    }

    const payload = verification.data as JwtPayload;
    (req as any).userId = payload?.userId;
    (req as any).userRole = payload?.role;
    next();
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).userRole;

    if (userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Forbidden - Admin access required",
        });
    }

    next();
};
