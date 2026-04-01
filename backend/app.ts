import dotenv from "dotenv";
import path from "path";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is healthy...");
});

import routes from "./src/routes/index.route";
app.use("/api/v1", routes);

import { errorHandler } from "./src/middlewares/error.middleware";
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
