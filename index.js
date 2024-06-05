import express from "express";
import { CLIENT_URL, DATABASE_URL, PORT } from "./config/env.js";
import morgan from "morgan";
import cors from "cors";
import { connectDb } from "./helper/connectDb.js";
import { join } from "path";
import * as route from "./router.js";

// initialize server
const app = express();

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

// Handle Client Server
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDb(DATABASE_URL);

// API Routes
app.use(`/api/user`, route.userRoute);
app.use(`/api/category`, route.categoryRoute);
app.use(`/api/product`, route.productRoute);
app.use(`/api/cart`, route.cartRoute);

// Static
app.use("/uploads", express.static(join(process.cwd(), "upload")));

// Start listing server
app.listen(PORT, () => {
  console.log(`start listening on port http://localhost:${PORT}`);
});

// Uncaught exceptions and unhandled rejections
process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", function (err) {
  console.error("Unhandled Rejection:", err);
});
