import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";
import LayerStyle from "./layerStyle.model";

const LayerStyleSchema = mongoose.model("LayerStyle").schema;

const LayerSchema = new mongoose.Schema({
  layer_type: {
    type: String,
    enum: [
      "marker",
      "polyline",
      "polygon",
      "rectangle",
      "circle",
      "circlemarker",
      "layergroup",
      "featuregroup",
      "geojson"
    ],
    required: true,
    validate: [
      function(val) {
        return this.layer_type.includes(val);
      },
      "type not supported"
    ]
  },
  bucket: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
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
        const err = new APIError("No such layer exists", httpStatus["204"]);
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
          "There are currently no layers inside the database",
          httpStatus["204"]
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
