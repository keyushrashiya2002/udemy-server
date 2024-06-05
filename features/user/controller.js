import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { bcryptPassword } from "../../helper/bcryptPassword.js";

import { generateToken } from "../../helper/jwtToken.js";

import UserModel from "./model.js";

class controller {
  static register = async (req, res) => {
    try {
      const { email, password } = req.body;

      const hashPassword = await bcryptPassword(password);

      const user = await UserModel.create({
        email,
        password: hashPassword,
      });

      const token = await generateToken({
        userId: user._id,
      });
      const result = (
        await UserModel.findById(user._id).select(
          "-createdAt -updatedAt -password"
        )
      ).toObject();

      return successResponse({
        res,
        statusCode: 201,
        data: { token, ...result },
        message: `User Register successfully`,
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "register",
      });
    }
  };

  static login = async (req, res) => {
    try {
      const token = await generateToken({
        userId: req.user._id,
      });

      return successResponse({
        res,
        statusCode: 200,
        message: "User Login successfully",
        data: {
          token,
          ...req.user,
        },
      });
    } catch (error) {
      return errorResponse({
        res,
        error,
        funName: "login",
      });
    }
  };
}
export default controller;
