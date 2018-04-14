import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./config/express";

// load environment variables
dotenv.config();

// set default promise to bluebird
Promise = require("bluebird");

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

const mongoUri = process.env.MONGODB_URI_LOCAL;
// find out what these configurations are about
mongoose.connect(mongoUri);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(process.env.PORT, () => {
  console.info(`server started on port ${process.env.PORT}`);
});

export default app;
