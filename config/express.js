import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";
import routes from "../routes/index.route";

const app = express();

if (process.env.NODE_ENV != "production") {
  app.use(logger("dev"));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: research if cookieparser is needed
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// use routes from index.route.js
app.use("/api", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError("API not found", httpStatus.NOT_FOUND);
  return next(err);
});

export default app;
