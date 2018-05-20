import express from "express";
import validate from "express-validation";
import passport from "passport";
import strategy from "../config/passport";
import jwt from "jsonwebtoken";
import paramValidation from "../config/param-validation";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

strategy();

router
  .route("")

  /* POST /api/users - Get user by Id*/
  .post(userCtrl.get);

router
  .route("/signup")

  /* POST /api/users/signup - Create new user */
  .post(validate(paramValidation.User), userCtrl.create);

router
  .route("/login")

  /* POST /api/users/login - user login */
  .post(
    validate(paramValidation.User),
    /* passport.authenticate("local") */
    function(req, res, next) {
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: "Something is not right",
            user: user
          });
        }
        console.log(user);
        if (!user.isActivated) {
          console.log("pumasok sa not authenticated");
          return res.status(400).json({
            message: "User not yet Authenticated"
          });
        }
        req.login(user._id, { session: false }, err => {
          if (err != null) {
            res.status(404).json({ message: "user", error: err });
          }
          console.log("hnggang dito");
          // generate a signed son web token with the contents of user object and return it in the response
          // const token = jwt.sign(user._id, "your_jwt_secret");
          return res.json({ user });
        });
      })(req, res);
    }
  );

router
  .route("/activate")

  /* PUT /api/users/activate - user activation*/
  .put(userCtrl.activate);

export default router;
