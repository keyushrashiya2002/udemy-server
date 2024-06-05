import express from "express";
import controller from "./controller.js";
import { verifyUser } from "../../middleware/verifyMiddleware.js";
import validate from "./validate.js";
import {
  checkAuthorization,
  permissions,
} from "../../middleware/checkAuthorization.js";

const route = express.Router();

route.post("/", verifyUser, validate.create, controller.create);

route.get(
  "/",
  verifyUser,
  checkAuthorization({
    permission: permissions.GET_ALL_PURCHASE,
  }),
  controller.get
);
route.get(
  "/count",
  verifyUser,
  checkAuthorization({
    permission: permissions.GET_ALL_PURCHASE,
  }),
  controller.getCount
);

route.get("/history", verifyUser, controller.getHistory);

route.patch(
  "/:id",
  verifyUser,
  checkAuthorization({
    permission: permissions.GET_ALL_PURCHASE,
  }),
  validate.patch,
  controller.patch
);

export default route;
