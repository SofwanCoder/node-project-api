import * as bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import methodOverride from "method-override";
import morgan from "morgan";
import { routerBase } from "./routes";
import errorMiddleware from "./middlewares/errorHandler";
import config from "./config";

export const app = express();
app.use("/public", express.static(config.dir.public));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  compression({
    filter: (req: Request, res: Response) => {
      if (req.headers["x-no-compression"]) {
        // don't compress responses with this request header
        return false;
      }
      // fallback to standard filter function
      return compression.filter(req, res);
    },
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  }),
);
app.disable("x-powered-by");
app.use(methodOverride());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Expose-Headers", "*");

  next();
});

app.use("/", routerBase);
app.use(cors());

app.use(errorMiddleware);
