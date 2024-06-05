import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import CartModel from "./model.js";

class controller {
  static get = async (req, res) => {
    try {
      const result = await CartModel.find({ user: req.user._id });

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Cart fetched successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "get.Cart",
      });
    }
  };
  static post = async (req, res) => {
    try {
      const result = await CartModel.create({
        product: req.body.product,
        user: req.user._id,
        quantity: 1,
      });

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Cart create successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "post.Cart",
      });
    }
  };
  static delete = async (req, res) => {
    try {
      const result = await CartModel.findByIdAndDelete(req.params.id);

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Cart delete successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "delete.Cart",
      });
    }
  };
  static increaseQut = async (req, res) => {
    try {
      const result = await CartModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { quantity: 1 } },
        { new: true }
      );

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Cart increase successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "increaseQut.Cart",
      });
    }
  };
  static decreaseQut = async (req, res) => {
    try {
      const result = await CartModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { quantity: -1 } },
        { new: true }
      );

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Cart decrease successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "decreaseQut.Cart",
      });
    }
  };
}
export default controller;
