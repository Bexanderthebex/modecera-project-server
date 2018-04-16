import User from "../models/user.model";
import httpStatus from "http-status";
import passport from "passport";
import APIError from "../helpers/APIError";
// import

function create(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(error => next(error));
}

function sample(req, res) {
  console.log("pumasok sa sample");
  res.json(req.user);
}

// do logout functionality

export default { create, sample };
