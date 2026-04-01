import dotenv from "dotenv";
import path from "path";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import { zodErrorCatcher } from "./src/middlewares/zodErrorCatcher";
import { errorHandler } from "./src/middlewares/errorHandler";

const app = express();

const PORT = 3000;

app.use(express.json());

import routes from "./src/routes/index.route";

app.use("/api/v1", routes);

app.get("/", (req, res) => {
    res.send("server is healthy...");
});

// Zod error catcher (before global error handler)
app.use(zodErrorCatcher);

// Global error handler middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
