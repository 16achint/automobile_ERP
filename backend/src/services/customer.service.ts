import { db } from "../config/db";
import { customers } from "../db/schema/customer/customer.schema";
import { customerAddresses } from "../db/schema/customer/address.schema";
import { customerContacts } from "../db/schema/customer/contact.schema";
import { customerRelatives } from "../db/schema/customer/relative.schema";
import { customerDocuments } from "../db/schema/customer/document.schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const createCustomer = async (data: any) => {
    const { addresses, contacts, documents, relatives, ...customerData } = data;

    // Insert customer with UUID
    const [customer] = await db
        .insert(customers)
        .values({ id: uuidv4(), ...customerData })
        .returning();

    const customerId = customer.id;

    // Insert related records in parallel and capture results
    let insertedAddresses: any[] = [];
    let insertedContacts: any[] = [];
    let insertedDocuments: any[] = [];
    let insertedRelatives: any[] = [];

    const promises: Promise<void>[] = [];

    if (addresses?.length) {
        promises.push(
            db.insert(customerAddresses)
                .values(addresses.map((a: any) => ({ id: uuidv4(), ...a, customerId })))
                .returning()
                .then((rows) => { insertedAddresses = rows; })
        );
    }

    if (contacts?.length) {
        promises.push(
            db.insert(customerContacts)
                .values(contacts.map((c: any) => ({ id: uuidv4(), ...c, customerId })))
                .returning()
                .then((rows) => { insertedContacts = rows; })
        );
    }

    if (documents?.length) {
        promises.push(
            db.insert(customerDocuments)
                .values(documents.map((d: any) => ({ id: uuidv4(), ...d, customerId })))
                .returning()
                .then((rows) => { insertedDocuments = rows; })
        );
    }

    if (relatives?.length) {
        promises.push(
            db.insert(customerRelatives)
                .values(relatives.map((r: any) => ({ id: uuidv4(), ...r, customerId })))
                .returning()
                .then((rows) => { insertedRelatives = rows; })
        );
    }

    await Promise.all(promises);

    return {
        success: true,
        message: "Customer created successfully",
        data: {
            ...customer,
            addresses: insertedAddresses,
            contacts: insertedContacts,
            documents: insertedDocuments,
            relatives: insertedRelatives,
        },
    };
};

export const getCustomers = async () => {
    const result = await db.select().from(customers);
    return {
        success: true,
        message: "Customers retrieved successfully",
        data: result,
        count: result.length,
    };
};

export const getCustomerById = async (id: string) => {
    const [customer] = await db
        .select()
        .from(customers)
        .where(eq(customers.id, id));

    if (!customer) {
        throw Object.assign(new Error("Customer not found"), { statusCode: 404 });
    }

    // Fetch related data
    const [addresses, contacts, documents, relatives] = await Promise.all([
        db.select().from(customerAddresses).where(eq(customerAddresses.customerId, id)),
        db.select().from(customerContacts).where(eq(customerContacts.customerId, id)),
        db.select().from(customerDocuments).where(eq(customerDocuments.customerId, id)),
        db.select().from(customerRelatives).where(eq(customerRelatives.customerId, id)),
    ]);

    return {
        success: true,
        data: { ...customer, addresses, contacts, documents, relatives },
    };
};

export const updateCustomer = async (id: string, data: any) => {
    const { addresses, contacts, documents, relatives, ...customerData } = data;

    const [result] = await db
        .update(customers)
        .set({ ...customerData, updatedAt: new Date() })
        .where(eq(customers.id, id))
        .returning();

    if (!result) {
        throw Object.assign(new Error("Customer not found"), { statusCode: 404 });
    }

    return {
        success: true,
        message: "Customer updated successfully",
        data: result,
    };
};

export const deleteCustomer = async (id: string) => {
    const [result] = await db
        .delete(customers)
        .where(eq(customers.id, id))
        .returning();

    if (!result) {
        throw Object.assign(new Error("Customer not found"), { statusCode: 404 });
    }

    return {
        success: true,
        message: "Customer deleted successfully",
        data: result,
    };
};
