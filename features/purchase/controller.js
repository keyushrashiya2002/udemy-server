import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationDetails, paginationFun } from "../../helper/common.js";
import PurchaseModel from "./model.js";

class controller {
  static post = async (req, res) => {
    try {
      const result = await PurchaseModel.create({
        ...req.body,
        user: req.user._id,
      });

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Purchase fetched successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "post.Purchase",
      });
    }
  };
  static get = async (req, res) => {
    try {
      const { skip, limit } = paginationFun(req.query);
      const result = await PurchaseModel.find({ user: req.user._id })
        .skip(skip)
        .limit(limit)
        .populate({ path: "items.product", select: "title" })
        .sort({ createdAt: -1 });

      const count = await PurchaseModel.countDocuments({ user: req.user._id });

      const pagination = paginationDetails({
        limit: limit,
        page: req.query.page,
        totalItems: count,
      });

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Purchase fetched successfully",
        pagination,
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "get.Purchase",
      });
    }
  };
}
export default controller;
