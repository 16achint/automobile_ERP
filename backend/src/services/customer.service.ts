import { db } from "../config/db";
import { customers } from "../db/schema";

export const createCustomer = async (data: any) => {
    return await db.insert(customers).values(data).returning();
};

export const getCustomers = async () => {
    return await db.select().from(customers);
};
