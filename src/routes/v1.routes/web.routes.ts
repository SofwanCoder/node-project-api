import express, { Router } from "express";
import * as validator from "../../shared/middlewares/validator";
import WebController from "../../controllers/web.controller";

const router = express.Router();

router.post(
  "/subscribe",
  validator.subscribeWebRules(),
  validator.validate(),
  WebController.handleSubscribe
);

router.post(
  "/contact",
  validator.contactWebRules(),
  validator.validate(),
  WebController.handleContact
);

export const webRoutes: Router = router;
