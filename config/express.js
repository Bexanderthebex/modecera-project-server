import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
// import session from "express-session";
import mongo from "connect-mongo";
import httpStatus from "http-status";
import lusca from "lusca";
import passport from "passport";
import dotenv from "dotenv";
import strategy from "./passport";
import User from "../models/user.model";
import APIError from "../helpers/APIError";
import routes from "../routes/index.route";

// load environment variables
dotenv.config();

// const MongoStore = mongo(session);

const app = express();

strategy();

if (process.env.NODE_ENV != "production") {
  app.use(logger("dev"));
}

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60 * 180 * 60 },
    store: new MongoStore({
      url: process.env.MONGODB_URI_LOCAL,
      autoReconnect: true
    })
  })
);
app.use(passport.initialize());
app.use(passport.session()); */
/* TODO: research if this is really needed */
app.use(passport.initialize());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

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
