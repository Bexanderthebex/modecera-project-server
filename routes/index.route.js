import express from "express";
import userRoutes from "./user.route";
import layerRoutes from "./layer.route";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/layers", layerRoutes);

export default router;
