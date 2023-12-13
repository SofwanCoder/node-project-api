import express, { Router } from "express";
import healthRoutes from "./health.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/users", userRoutes);
router.use("/auths", authRoutes);

export const routerVersion1: Router = router;
