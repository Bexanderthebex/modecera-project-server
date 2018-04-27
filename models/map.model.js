import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "../helpers/APIError";

const MapSchema = new mongoose.Schema({
  map_name: {
    type: String,
    required: true,
    unique: true
  },
  access_token: {
    type: String,
    required: true
  },
  attribution: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

MapSchema.statics = {
  /**
   * @param {map_name}
   * @returns Promise{<Map, APIerror>}
   */
  get(name) {
    return this.findOne({ map_name: name })
      .exec()
      .then(map => {
        if (map) {
          return map;
        }
        const err = new APIError("No such map exists", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getAll() {
    return this.find()
      .exec()
      .then(maps => {
        if (maps) {
          return maps;
        }
        /* missing status parameter would result to httpStatus.INTERNAL_SERVER_STATUS */
        const err = new APIError(
          "An error occurred when fetching data from the database"
        );
        return Promise.reject(err);
      });
  }
};

export default mongoose.model("Map", MapSchema);
