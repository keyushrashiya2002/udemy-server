import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationDetails, paginationFun } from "../../helper/common.js";
import CartModel from "./model.js";

class controller {
  static get = async (req, res) => {
    try {
      const { skip, limit } = paginationFun(req.query);
      const result = await CartModel.aggregate([
        { $match: { user: req.user._id } },
        {
          $sort: { created: -1 },
        },

        {
          $lookup: {
            from: "products", // Name of the collection to join
            localField: "product", // Field from the input documents
            foreignField: "_id", // Field from the documents of the "from" collection
            as: "product", // Output array field
          },
        },
        {
          $unwind: "$product", // Deconstructs the product array
        },
        {
          $project: {
            productId: "$product._id",
            title: "$product.title",
            price: "$product.price",
            quantity: 1,
          },
        },
      ]);

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
      const doc = await CartModel.create({
        product: req.params.id,
        user: req.user._id,
        quantity: 1,
      });

      const result = await CartModel.aggregate([
        { $match: { _id: doc._id } },
        {
          $lookup: {
            from: "products", // Name of the collection to join
            localField: "product", // Field from the input documents
            foreignField: "_id", // Field from the documents of the "from" collection
            as: "product", // Output array field
          },
        },
        {
          $unwind: "$product", // Deconstructs the product array
        },
        {
          $project: {
            title: "$product.title",
            price: "$product.price",
            quantity: 1,
          },
        },
      ]);

      return successResponse({
        res,
        statusCode: 200,
        data: result[0],
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
      await CartModel.findByIdAndDelete(req.params.id);

      return successResponse({
        res,
        statusCode: 200,
        data: req.params.id,
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
