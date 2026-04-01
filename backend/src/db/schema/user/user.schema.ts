import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").primaryKey().default("uuid_generate_v4()"), // UUID primary key
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    mobile: text("mobile"),
    role: text("role").default("user"), // user, admin, supervisor
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRoles = pgTable("user_roles", {
    id: text("id").primaryKey().default("uuid_generate_v4()"), // UUID primary key
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull(), // admin, supervisor, operator, viewer
    createdAt: timestamp("created_at").defaultNow(),
});
