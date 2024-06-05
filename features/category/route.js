import express from "express";
import controller from "./controller.js";
import { fakeDataEntry } from "./fakeDataEntry.js";

const route = express.Router();

route.get("/", fakeDataEntry, controller.get);

export default route;
