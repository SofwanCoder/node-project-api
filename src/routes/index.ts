import express, { Router } from "express";
import { routerDocs } from "./docs";
import { routerVersion1 } from "./v1.routes";

const router = express.Router();

router.use("/v1", routerVersion1);
router.use("/docs", routerDocs);

export const routerBase: Router = router;
