import express, { type Router } from "express";
import swaggerUi from "swagger-ui-express";
const router = express.Router();

router.use(
  "/view",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/docs/json",
    },
  }),
);

router.get("/json", (req, res) => {
  return res.sendFile("swagger.json", { root: "public/docs" });
});

export const routerDocs: Router = router;
