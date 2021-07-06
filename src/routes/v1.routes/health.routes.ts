import express, { Router } from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ status: "OK" });
});

export const healthRoutes: Router = router;
