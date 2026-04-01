import { Request, Response } from "express";
import * as customerService from "../services/customer.service";

export const createCustomer = async (req: Request, res: Response) => {
    try {
        console.log("Request body:"); // Debugging log
        console.log("here", req.body); // Log the request body to see what is being received
        const data = await customerService.createCustomer(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to create customer" });
    }
};

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const data = await customerService.getCustomers();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customers" });
    }
};
