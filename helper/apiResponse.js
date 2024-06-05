import mongoose from "mongoose";

export const successResponse = async ({
  res,
  statusCode = 200,
  message,
  data,
  pagination,
}) => {
  return res
    .status(statusCode)
    .json({ success: true, message, data, pagination });
};

export const errorResponse = async ({
  funName,
  res,
  error,
  success = false,
  statusCode = 400,
  message = "Whoops! Something went wrong. We're on it!",
}) => {
  let arrOjb = {};
  if (error instanceof mongoose.Error.CastError) {
    message = "Invalid ID provided";
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
    message = "Document not found";
  } else if (error instanceof mongoose.Error.ValidationError) {
    for (const element of Object.keys(error.errors)) {
      const requiredType = error.errors[element].kind.replace(/[^\w\s]/gi, "");
      const keyErrorMessage = `value must be a ${requiredType}`;
      arrOjb[element] = keyErrorMessage;
    }

    message = "Validation failed";
    statusCode = 401;
  }
  if (error?.name === "MongoServerError" && error?.code === 11000) {
    statusCode = 400;
    message = "Document already exists";
  } else if (error?.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  } else if (error?.name === "TokenExpiredError") {
    message = "Token expired";
    statusCode = 401;
  } else if (error?.name === "NotBeforeError") {
    message = "Token not yet valid";
    statusCode = 401;
  }

  return res.status(statusCode).json({ success, message, ...arrOjb });
};

export const validateResponse = (res, error, statusCode = 400) => {
  let arrOjb = { message: "error", success: false };

  error.details.map((item, key) => {
    const { path, message } = item;
    arrOjb = { ...arrOjb, [path]: message.replace(/['"]/g, "") };
  });

  return res.status(statusCode).json(arrOjb);
};
