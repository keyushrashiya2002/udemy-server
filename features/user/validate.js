import Joi from "joi";

import { errorResponse, validateResponse } from "../../helper/apiResponse.js";
import { comparePasswords } from "../../helper/bcryptPassword.js";
import UserModel from "./model.js";

const options = {
  abortEarly: false,
};

class validate {
  static register = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      email: Joi.string().required().label("email").email(),
      password: Joi.string().required().label("password"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) return validateResponse(res, error);

    const user = await UserModel.findOne({ email: req.body.email }).select(
      "_id"
    );

    if (user)
      return errorResponse({
        res,
        message: "User with this email already exist!",
      });

    next();
  };

  static login = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      email: Joi.string().required().label("email"),
      password: Joi.string().required().label("password"),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) return validateResponse(res, error);

    const { email, password } = req.body;

    let user = await UserModel.findOne({ email }).select(
      "-createdAt -updatedAt "
    );

    if (!user)
      return errorResponse({ res, message: "invalid user credentials" });

    if (!user.password)
      return errorResponse({
        res,
        message: "You have to login with social media",
      });

    const verifyPassword = await comparePasswords(password, user.password);

    if (!verifyPassword)
      return errorResponse({ res, message: "invalid user credentials" });

    user = user.toObject();

    delete user.password;
    console.log(user);
    req.user = user;
    next();
  };
}

export default validate;
