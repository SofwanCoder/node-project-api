import express, { Router } from "express";
import { healthRoutes } from "./health.routes";
import { userRoutes } from "./user.routes";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/users", userRoutes);

export const routerVersion1: Router = router;
