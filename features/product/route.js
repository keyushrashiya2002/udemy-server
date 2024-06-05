import express from "express";
import controller from "./controller.js";

const route = express.Router();

route.get("/", controller.get);

export default route;
