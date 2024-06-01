import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import CatchAsyncError from "./catchasync.js";
import ErrorHandler from "../utils/errorhandler.js";

dotenv.config();

export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(new ErrorHandler("Please provide an access token", 400));
  }
  const access_token = authorizationHeader.split(" ")[1];
  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 400));
  }

  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }
    let user;
    user = await User.findOne({ email: decoded.email }).lean();

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Error while verifying access token", 400));
  }
});
