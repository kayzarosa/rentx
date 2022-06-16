import { Router } from "express";

import authenticateRoutes from "./authenticate.routes";
import carsRoutes from "./cars.routes";
import categoriesRoutes from "./categories.routes";
import specificationsRoutes from "./specifications.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/user", userRoutes);
router.use("/cars", carsRoutes);
router.use(authenticateRoutes);

export default router;
