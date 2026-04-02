import express from "express";
import * as customerController from "../controllers/customer.controller";
import {adminMiddleware,authMiddleware} from "../middlewares/authMiddleware"

const router = express.Router();

router.post("/",authMiddleware, customerController.createCustomer);
router.get("/",authMiddleware, customerController.getCustomers);
router.get("/:id",authMiddleware, customerController.getCustomerById);
router.put("/:id",authMiddleware, customerController.updateCustomer);
router.delete("/:id",authMiddleware,adminMiddleware,  customerController.deleteCustomer);
export default router;
