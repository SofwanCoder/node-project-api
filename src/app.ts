import { config } from "dotenv";
config();
import * as bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
// eslint-disable-next-line import/order
import { IncomingMessage, ServerResponse } from "http";
import methodOverride from "method-override";
import morgan from "morgan";
import { routerBase } from "./routes";
import errorMiddleware from "./shared/middlewares/errorHandler";

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(
  bodyParser.json({
    /**
     * This piece of code is important because webhook from coinbase needs
     * the raw-body of the request to compute the integrity of the request.
     * The check ensures that only request to the url saves the rawBody, so
     * as to avoid excess ram consumption on every request*/
    verify(req: IncomingMessage, res: ServerResponse, buf: Buffer) {
      if (req.headers["x-cc-webhook-signature"]) {
        (req as any).rawBody = buf;
      }
      // if (req.url?.includes("webhook/cb-events")) {
      //   (req as any).rawBody = buf;
      // }
    },
  })
);
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
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);
app.disable("x-powered-by");
app.use(methodOverride());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/", routerBase);
app.use(cors());

app.use(errorMiddleware);
