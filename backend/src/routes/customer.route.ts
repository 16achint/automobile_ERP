import express from "express";
import * as customerController from "../controllers/customer.controller";

const router = express.Router();

router.post("/create", customerController.createCustomer);
router.get("/list", customerController.getCustomers);

export default router;
