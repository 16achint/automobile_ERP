import express from "express";
import customerRouter from "./customer.route";

const router = express.Router();

router.use("/customers", customerRouter);

export default router;
