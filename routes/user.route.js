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
  .route("/signup")

  /* POST /api/users/signup - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router
  .route("/login")

  /* POST /api/users/login - user login */
  .post(
    validate(paramValidation.createUser),
    /* passport.authenticate("local") */
    function(req, res, next) {
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: "Something is not right",
            user: user
          });
        }
        req.login(user, { session: false }, err => {
          if (err != null) {
            res.send(err);
          }
          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign(user, "your_jwt_secret");
          return res.json({ user, token });
        });
      })(req, res);
    }
  );

router.route("logout").post();

router
  .route("/sample")
  .get(passport.authenticate("jwt", { session: false }), userCtrl.sample);
export default router;
