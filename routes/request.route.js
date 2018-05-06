import express from "express";
import requestCtrl from "../controllers/request.controller";

const router = express.Router();

router
  .route("/")

  /* GET /api/requests - returns all system requests */
  .get(requestCtrl.getAllRequests)

  /* POST /api/requests - creates a new system request */
  .post(requestCtrl.addRequest);

 router
  .route("/approve")

  /* PUT /api/requests/approved - approves a user request*/
  .put(requestCtrl.approveRequest);

export default router;
