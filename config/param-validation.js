import Joi from "joi";

export default {
  // POST /api/users
  User: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    }
  },
  Layer: {
    body: {
      layer_type: Joi.string().valid([
        "marker",
        "polyline",
        "polygon",
        "rectangle",
        "circle",
        "circlemarker",
        "layergroup",
        "featuregroup",
        "geojson"
      ]),
      bucket: Joi.string().required(),
      name: Joi.string().required(),
      link: Joi.string().required()
    }
  },
  deleteLayer: {
    body: {
      _id: Joi.string().required()
    }
  }
};
