import express from "express";
import customerRouter from "./customer.route";
import authRouter from "./auth.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/customers", customerRouter);

export default router;
