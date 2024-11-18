import express from "express";
import { testController } from "../controller/testController.js";
import { userAuthentication } from "../middlewares/authMiddleware.js";

const router = express.Router();

//sub-routes
router.post("/your-name", userAuthentication, testController);

export default router;
