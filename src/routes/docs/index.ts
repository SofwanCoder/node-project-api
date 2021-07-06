import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
const router = express.Router();

import docs from "../../docs";

router.use("/view", swaggerUi.serve, swaggerUi.setup(docs));

router.get("/raw", (req, res) => {
  return res.send(docs);
});

export const routerDocs: Router = router;
