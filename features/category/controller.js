import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import CategoryModel from "./model.js";

class controller {
  static get = async (req, res) => {
    try {
      const filter = req.query.title
        ? { title: new RegExp(req.query.title, "i") }
        : {};

      const result = await CategoryModel.find(filter)
        .select("title")
        .sort("title");

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
}
export default controller;
