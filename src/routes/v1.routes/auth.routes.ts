import express from "express";
import { validateWithJoi } from "../../middlewares/validator";
import AuthHandler from "../../handlers/AuthHandler";
import {
  AUTH_DO_EMAIL_VERIFICATION_SCHEMA,
  AUTH_SESSION_CREATION_SCHEMA,
} from "../../middlewares/validator/auth.validations";
import requirePermission from "../../middlewares/permission";

const router = express.Router();

router.post(
  "/sessions",
  validateWithJoi(AUTH_SESSION_CREATION_SCHEMA),
  AuthHandler.handleCreateSession,
);

router.post(
  "/verifiers",
  requirePermission(),
  AuthHandler.handleSendVerificationEmail,
);

router.post(
  "/verify",
  requirePermission(),
  validateWithJoi(AUTH_DO_EMAIL_VERIFICATION_SCHEMA),
  AuthHandler.handleDoEmailVerification,
);

export default router;
