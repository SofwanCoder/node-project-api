import express, { Router } from "express";
import UserHandler from "../../handlers/UserHandler";
import validateRules from "../../middlewares/validator";
import { createUserRules } from "../../middlewares/validator/user.validations";

const router = express.Router();

router.post(
  "/",
  createUserRules(),
  validateRules(),
  UserHandler.handleCreateUser
);

export const userRoutes: Router = router;
