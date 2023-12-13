import express, { type Router } from "express";
import { decryptAuthorization } from "../middlewares/decryptAuthorization";
import { routerDocs } from "./docs";
import { routerVersion1 } from "./v1.routes";
import NotFoundException from "../exceptions/http/NotFoundException";

const router = express.Router();

router.use(decryptAuthorization);

router.use("/v1", routerVersion1);
router.use("/docs", routerDocs);

router.get("*", function () {
  throw new NotFoundException("Route not found");
});
export const routerBase: Router = router;
