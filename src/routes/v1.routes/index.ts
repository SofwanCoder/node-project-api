import express, { Router } from "express";
import { healthRoutes } from "./health.routes";
import { userRoutes } from "./user.routes";
import { webRoutes } from "./web.routes";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/users", userRoutes);
router.use("/web", webRoutes);

export const routerVersion1: Router = router;
