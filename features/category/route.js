import express from "express";
import controller from "./controller.js";
import validate from "./validate.js";

const route = express.Router();

route.post("/", validate.create, controller.create);
route.get("/", controller.get);
route.delete("/:id", controller.delete);
route.patch("/:id", validate.patch, controller.patch);

export default route;
