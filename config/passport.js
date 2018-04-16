import passport from "passport";
import LocalStrategy from "passport-local";
import * as passportJWT from "passport-jwt";
import User from "../models/user.model";
import APIError from "../helpers/APIError";

export default function() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        let user = new User({
          email: email,
          password: password
        });

        User.get(email)
          .then(result => {
            if (result.validPassword(user.password)) {
              return done(null, result.id);
            }
            return done(null, false);
          })
          .catch(error => {
            return done(null, false);
          });
      }
    )
  );

  passport.use(
    new passportJWT.Strategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "your_jwt_secret"
      },
      function(jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        console.log(jwtPayload);
        return User.getById(jwtPayload)
          .then(user => {
            return cb(null, user);
          })
          .catch(err => {
            return cb(err);
          });
      }
    )
  );
}
