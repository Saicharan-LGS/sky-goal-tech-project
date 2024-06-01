import express from "express";
import {
  UpdateUserDetails,
  UpdateUserPassword,
  getUserInfo,
  userLogin,
  userRegistration,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/registration", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/getUserInfo", isAuthenticated, getUserInfo);
userRouter.put("/updateUserDetails", isAuthenticated, UpdateUserDetails);
userRouter.put("/updatePassword", isAuthenticated, UpdateUserPassword);
