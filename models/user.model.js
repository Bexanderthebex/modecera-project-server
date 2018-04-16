import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import passportLocalMongoose from "passport-local-mongoose";
import APIError from "../helpers/APIError";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add here
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/* methods */
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

/* statics */
UserSchema.statics = {
  /**
   * Get user
   * @param {email}
   * @returns {Promise<User, APIError>}
   */
  get(email) {
    return this.findOne({ email: email })
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        const err = new APIError("No such user exists!", httpStatus["404"]);
        return Promise.reject(err);
      });
  },

  /**
   * Get user by ID
   * @param {_id}
   * @returns {Promise<User, APIError>}
   */
  getById(id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) {
          return user;
        }
        const err = new APIError("No such user exists!", httpStatus["404"]);
        return Promise.reject(err);
      });
  }
};

/* pre-save hooks */
UserSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

/**
 * @typedef User
 */
export default mongoose.model("User", UserSchema);
