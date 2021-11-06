import express, { Router } from "express";
import UserHandler from "../../handlers/UserHandler";
import { loginUserRules } from "../../middlewares/validator/auth.validations";
import validateRules from "../../middlewares/validator";
import { createUserRules } from "../../middlewares/validator/user.validations";

const router = express.Router();

router.post(
  "/sign-in",
  loginUserRules(),
  validateRules(),
  UserHandler.handleLoginUser
);

router.post(
  "/",
  createUserRules(),
  validateRules(),
  UserHandler.handleCreateUser
);

export const userRoutes: Router = router;
