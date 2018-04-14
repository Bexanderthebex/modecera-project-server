import express from "express";
import validate from "express-validation";
import paramValidation from "../config/param-validation";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router
  .route("/")

  /* POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

export default router;
