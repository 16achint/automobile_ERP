import { db } from "../config/db";
import { customers } from "../db/schema/customer/customer.schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const createCustomer = async (data: any) => {
    try {
        const [result] = await db
            .insert(customers)
            .values({
                id: uuidv4(),
                ...data,
            })
            .returning();

        return {
            success: true,
            message: "Customer created successfully",
            data: result,
        };
    } catch (error: any) {
        throw new Error(`Failed to create customer: ${error.message}`);
    }
};

export const getCustomers = async () => {
    try {
        const result = await db.select().from(customers);
        return {
            success: true,
            message: "Customers retrieved successfully",
            data: result,
            count: result.length,
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch customers: ${error.message}`);
    }
};

export const getCustomerById = async (id: string) => {
    try {
        const [result] = await db
            .select()
            .from(customers)
            .where(eq(customers.id, id));

        if (!result) {
            throw new Error("Customer not found");
        }

        return {
            success: true,
            data: result,
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch customer: ${error.message}`);
    }
};

export const updateCustomer = async (id: string, data: any) => {
    try {
        const [result] = await db
            .update(customers)
            .set(data)
            .where(eq(customers.id, id))
            .returning();

        return {
            success: true,
            message: "Customer updated successfully",
            data: result,
        };
    } catch (error: any) {
        throw new Error(`Failed to update customer: ${error.message}`);
    }
};

export const deleteCustomer = async (id: string) => {
    try {
        const [result] = await db
            .delete(customers)
            .where(eq(customers.id, id))
            .returning();

        return {
            success: true,
            message: "Customer deleted successfully",
            data: result,
        };
    } catch (error: any) {
        throw new Error(`Failed to delete customer: ${error.message}`);
    }
};
