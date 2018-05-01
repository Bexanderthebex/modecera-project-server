import express from "express";
import validate from "express-validation";
import paramValidation from "../config/param-validation";
import layerCtrl from "../controllers/layer.controller";
import Multer from "multer";
import layerController from "../controllers/layer.controller";

const multer = Multer({
  storage: Multer.memoryStorage()
});

const router = express.Router();

router
  .route("/")

  /* GET /api/layers - returns a list of all the layers inside the database */
  .get(layerCtrl.getAllLayers)

  /* POST /api/layers - create new layer*/
  .post(validate(paramValidation.Layer), layerCtrl.addLayer)

  /* DELETE /api/layers - deletes layers */
  .delete(layerCtrl.deleteLayer, layerCtrl.removeLayer);

router
  .route("/labelgroup")

  /*POST /api/layers/labelgroup - get layers by name*/
  .post(layerCtrl.getLayerByLabelGroup);

router
  .route("/upload")

  /* POST /api/layers/upload - upload layer then update database */
  .post(
    multer.single("sample"),
    layerController.addLayer,
    layerCtrl.uploadLayer
  );

export default router;
