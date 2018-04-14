import Joi from "joi";

export default {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  }
};
