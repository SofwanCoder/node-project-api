import express from "express";
import UserHandler from "../../handlers/UserHandler";
import { validateWithJoi } from "../../middlewares/validator";
import { USER_CREATION_SCHEMA } from "../../middlewares/validator/user.validations";
import requirePermission from "../../middlewares/permission";

const router = express.Router();

router.post(
  "/",
  validateWithJoi(USER_CREATION_SCHEMA),
  UserHandler.handleCreateUser,
);

router.get("/:userId", requirePermission(), UserHandler.handleFetchUser);

export default router;
