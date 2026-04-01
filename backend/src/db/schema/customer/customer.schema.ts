import { pgTable, serial, text, date, numeric, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),

    // Basic Info
    name: text("name").notNull(),
    mobile: text("mobile").notNull(),
    email: text("email"),
    address: text("address"),

    // Purchase Info
    bikeModel: text("bike_model"),
    purchaseDate: date("purchase_date"),
    modeOfPayment: text("mode_of_payment"),

    // Financials
    cash: numeric("cash").default("0"),
    credit: numeric("credit").default("0"),
    creditor: boolean("creditor").default(false),

    // Extra fields (important for your system)
    promiseDate: date("promise_date"),
    priceByCustomer: integer("price_by_customer"),
    premiumAmount: numeric("premium_amount").default("0"),
    priceDifference: numeric("price_difference").default("0"),

    createdAt: timestamp("created_at").defaultNow(),
});
