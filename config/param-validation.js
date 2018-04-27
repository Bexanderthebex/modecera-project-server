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
      bucket: Joi.string().required(),
      name: Joi.string().required()
    }
  },
  deleteLayer: {
    body: {
      _id: Joi.string().required()
    }
  }
};
