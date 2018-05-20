import User from "../models/user.model";
import httpStatus from "http-status";
import passport from "passport";
import APIError from "../helpers/APIError";
// import

function create(req, res, next) {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  });

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(error => next(new APIError(error, httpStatus.BAD_REQUEST)));
}

function get(req, res, next) {
  User.getById(req.body.id)
    .then(User => res.status(200).json(User))
    .catch(error => next(new APIError(error, httpStatus.NOT_FOUND)));
}

function activate(req, res, next) {
  User.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { isActivated: true } },
    { new: true }
  )
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(error => next(new APIError(error, httpStatus.BAD_REQUEST)));
}

// do logout functionality

export default { create, get, activate };
