import express from "express";
import userRoutes from "./user.route";
import layerRoutes from "./layer.route";
import mapRoutes from "./map.route";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/layers", layerRoutes);
router.use("/maps", mapRoutes);

export default router;
