import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationDetails, paginationFun } from "../../helper/common.js";
import { isExist } from "../../helper/isExist.js";
import CategoryModel from "./model.js";

class controller {
  static create = async (req, res) => {
    try {
      const result = await CategoryModel.create(req.body);
      return successResponse({
        res,
        statusCode: 201,
        data: {
          _id: result._id,
          title: result.title,
          post: 0,
          user: 0,
        },
        message: "Category created successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "create.Category",
      });
    }
  };

  static get = async (req, res) => {
    try {
      const { title } = req.query;

      let filter = {};
      if (title) filter.title = { $regex: title, $options: "i" };

      const result = await CategoryModel.find(filter)
        .select("title")
        .sort({ title: 1 });

      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Category fetched successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "get.Category",
      });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    try {
      await isExist(res, id, CategoryModel);
      await CategoryModel.findByIdAndDelete(id);

      return successResponse({
        res,
        statusCode: 200,
        message: "Documents deleted successfully",
        data: id,
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "delete.Category",
      });
    }
  };

  static patch = async (req, res) => {
    const { id } = req.params;
    try {
      await isExist(res, id, CategoryModel);
      const result = await CategoryModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Category updated successfully",
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "patch.Category",
      });
    }
  };
}
export default controller;
