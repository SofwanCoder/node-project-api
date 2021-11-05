import express, { Router } from "express";
import * as validator from "../../shared/middlewares/validator";
import WebHandler from "../../handlers/web.handler";

const router = express.Router();

router.post(
  "/subscribe",
  validator.subscribeWebRules(),
  validator.validate(),
  WebHandler.handleSubscribe
);

router.post(
  "/contact",
  validator.contactWebRules(),
  validator.validate(),
  WebHandler.handleContact
);

export const webRoutes: Router = router;
