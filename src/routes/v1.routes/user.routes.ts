import express, { Router } from "express";
import UserHandler from "../../handlers/user.handler";
import * as validator from "../../shared/middlewares/validator";

const router = express.Router();

router.post(
  "/sign-in",
  validator.loginUserRules(),
  validator.validate(),
  UserHandler.handleLoginUser
);

router.post(
  "/",
  validator.createUserRules(),
  validator.validate(),
  UserHandler.handleCreateUser
);

export const userRoutes: Router = router;
