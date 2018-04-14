import Promise from "bluebird";
import mongoose from "mongoose";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
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
UserSchema.method({
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  }
});

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

export default mongoose.model("User", UserSchema);
