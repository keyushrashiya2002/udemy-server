import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationDetails, paginationFun } from "../../helper/common.js";

import ProductModel from "./model.js";

class controller {
  static get = async (req, res) => {
    const { minPrice, maxPrice, category, title } = req.query;
    try {
      const { skip, limit } = paginationFun(req.query);

      let filter = {};

      if (category) filter.category = category;
      if (title) filter.title = new RegExp(title, "i");

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = minPrice;
        if (maxPrice) filter.price.$lt = maxPrice;
      }

      const result = await ProductModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate({ path: "category", select: "title" });

      const count = await ProductModel.countDocuments(filter);

      const pagination = paginationDetails({
        limit: limit,
        page: req.query.page,
        totalItems: count,
      });

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Product fetched successfully",
        pagination,
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "Product.get",
      });
    }
  };
}
export default controller;
