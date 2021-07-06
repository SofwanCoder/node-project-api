import express, { Router } from "express";
import UserController from "../../controllers/user.controller";
import * as validator from "../../shared/middlewares/validator";

const router = express.Router();

router.post(
  "/sign-in",
  validator.loginUserRules(),
  validator.validate(),
  UserController.handleLoginUser
);

router.post(
  "/",
  validator.createUserRules(),
  validator.validate(),
  UserController.handleCreateUser
);

export const userRoutes: Router = router;
