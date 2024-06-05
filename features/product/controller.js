import mongoose from "mongoose";
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

      const result = await ProductModel.aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $lookup: {
            from: "carts",
            let: {
              productId: "$_id",
              userId: new mongoose.Types.ObjectId(req.user._id),
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$product", "$$productId"] },
                      { $eq: ["$user", "$$userId"] },
                    ],
                  },
                },
              },
            ],
            as: "totalDownloads",
          },
        },

        {
          $project: {
            title: 1,
            price: 1,
            createdAt: 1,
            "category.title": 1,
            cart: { $arrayElemAt: ["$totalDownloads", 0] },
          },
        },
      ]);

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
