import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";

const LayerStyleSchema = new mongoose.Schema({
  color: {
  	type: String,
  	default: '#ed3b28'
  },
  // whether to draw stroke along the path
  stroke: {
  	type: Boolean, 
  	default: true
  },
  // stroke width in pixels
  weight: {
  	type: Number,
  	default: 3
  },
  opacity: {
  	type: Number,
  	default: 1.0
  },
  fillOpacity: {
  	type: Number,
  	default: 0.2
  }
});

export default mongoose.model("LayerStyle", LayerStyleSchema);
