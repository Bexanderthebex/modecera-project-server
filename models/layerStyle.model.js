import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";

const LayerStyleSchema = new mongoose.Schema({
  color: String,
  stroke: Boolean,
  weight: Number,
  opacity: Number,
  fillOpacity: Number
});

export default mongoose.model("LayerStyle", LayerStyleSchema);
