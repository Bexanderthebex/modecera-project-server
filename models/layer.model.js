import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";
import LayerStyle from "./layerStyle.model";

const LayerStyleSchema = mongoose.model("LayerStyle").schema;

const LayerSchema = new mongoose.Schema({
  /* probably make a bucket schema too */
  bucket: {
    type: String,
    required: true
  },
  label_group: {
    type: String,
    label: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    unique: true
  },
  style: LayerStyleSchema
});

LayerSchema.statics = {
  /**
   *
   * @param {name}
   * @returns {Promise<Layer, APIError>}
   */
  get(name) {
    return this.findOne({ name: name })
      .exec()
      .then(layer => {
        if (layer) {
          return layer;
        }
        const err = new APIError("No such layer exists", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * @param {}
   * @return {Promise<Layer, APIError>}
   */
  getAll() {
    return this.find()
      .exec()
      .then(layers => {
        if (layers) {
          return layers;
        }
        const err = new APIError(
          "An error occurred when fetching data from the database"
        );
        return Promise.reject(err);
      });
  }
};

LayerSchema.pre("save", function(next) {
  let layer = this;

  layer.link = `https://www.googleapis.com/storage/v1/b/${layer.bucket}/o/${
    layer.name
  }?alt=media`;

  next();
});

export default mongoose.model("Layer", LayerSchema);
