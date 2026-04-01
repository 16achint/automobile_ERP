import express from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/me", authMiddleware, authController.getUser);
router.put("/me", authMiddleware, authController.updateUser);
router.delete("/:id", authMiddleware, authController.deleteUser);

export default router;
