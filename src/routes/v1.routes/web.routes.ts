import express, { Router } from "express";
import WebHandler from "../../handlers/WebHandler";
import validateRules from "../../middlewares/validator";

const router = express.Router();

router.post("/subscribe", [], validateRules(), WebHandler.handleSubscribe);

router.post("/contact", [], validateRules(), WebHandler.handleContact);

export const webRoutes: Router = router;
