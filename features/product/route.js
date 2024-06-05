import express from "express";
import controller from "./controller.js";
import { verifyUser } from "../../middleware/verifyMiddleware.js";

const route = express.Router();

route.get("/", verifyUser, controller.get);

export default route;
