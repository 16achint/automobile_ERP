import { db } from "../config/db";
import { users } from "../db/schema/user/user.schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
    mobile?: string;
    role?: string;
}) => {
    try {
        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, data.email));

        if (existingUser.length > 0) {
            throw new Error("User already exists with this email");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user with UUID
        const [user] = await db
            .insert(users)
            .values({
                id: uuidv4(),
                name: data.name,
                email: data.email,
                password: hashedPassword,
                mobile: data.mobile,
                role: data.role || "user",
            })
            .returning();

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "24h",
        });

        return {
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    } catch (error: any) {
        throw new Error(`Registration failed: ${error.message}`);
    }
};

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        // Find user by email
        const [user] = await db.select().from(users).where(eq(users.email, data.email));

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
            throw new Error("User account is inactive");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "24h",
        });

        return {
            success: true,
            message: "Login successful",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    } catch (error: any) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

export const getUserById = async (id: string) => {
    try {
        const [user] = await db.select().from(users).where(eq(users.id, id));

        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                mobile: user.mobile,
                isActive: user.isActive,
            },
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

export const updateUser = async (id: string, data: any) => {
    try {
        const [user] = await db
            .update(users)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(users.id, id))
            .returning();

        return {
            success: true,
            message: "User updated successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    } catch (error: any) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};

export const deleteUser = async (id: string) => {
    try {
        const [user] = await db.delete(users).where(eq(users.id, id)).returning();

        return {
            success: true,
            message: "User deleted successfully",
            data: { id: user.id },
        };
    } catch (error: any) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { valid: true, data: decoded };
    } catch (error) {
        return { valid: false, data: null };
    }
};
