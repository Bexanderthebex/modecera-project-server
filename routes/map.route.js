import express from "express";
import validate from "express-validation";
import paramValidation from "../config/param-validation";
import mapCtrl from "../controllers/map.controller";

const router = express.Router();

router
  .route("/")

  /* GET /api/maps - returns a list of all the maps in the database */
  .get(mapCtrl.getAllMaps)

  /* POST /api/maps - create a new map into the database */
  /* TODO: add param validation */
  .post(mapCtrl.addMap)

  /* DELETE /api/maps - deletes maps based on array param of id's 
   * @param {id[]} 
  */
  .delete(mapCtrl.deleteMaps);

export default router;
