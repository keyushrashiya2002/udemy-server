import express from "express";
import controller from "./controller.js";
import { verifyUser } from "../../middleware/verifyMiddleware.js";

const route = express.Router();

route.post("/:id", verifyUser, controller.post);
route.get("/", verifyUser, controller.get);
route.delete("/:id", controller.delete);
route.patch("/increase/:id", controller.increaseQut);
route.patch("/decrease/:id", controller.decreaseQut);

export default route;
