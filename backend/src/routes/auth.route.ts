import express from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleware,adminMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/register",authMiddleware, adminMiddleware, authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/me", authMiddleware, authController.getUser);
router.put("/me", authMiddleware, authController.updateUser);
router.delete("/me", authMiddleware, adminMiddleware, authController.deleteUser);

export default router;
