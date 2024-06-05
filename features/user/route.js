import express from "express";
import controller from "./controller.js";
import validate from "./validate.js";

const route = express.Router();

route.post("/register", validate.register, controller.register);
route.post("/login", validate.login, controller.login);

export default route;
