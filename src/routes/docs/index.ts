import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
const router = express.Router();

const docs = require("../../../swagger.json");

router.use("/", swaggerUi.serve, swaggerUi.setup(docs));

router.get("/json", (req, res) => {
  return res.send(docs);
});

export const routerDocs: Router = router;
