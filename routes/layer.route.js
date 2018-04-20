import express from "express";
import validate from "express-validation";
import paramValidation from "../config/param-validation";
import layerCtrl from "../controllers/layer.controller";

const router = express.Router();

router
  .route("/")

  /* GET /api/layers - returns a list of all the layers inside the database */
  .get(layerCtrl.getAllLayer)

  /* POST /api/layers - create new layer*/
  .post(validate(paramValidation.Layer), layerCtrl.addLayer)

  .delete(validate(paramValidation.deleteLayer), layerCtrl.removeLayer);

/* test upload */
router.route("/upload").post(layerCtrl.uploadLayer);

export default router;
