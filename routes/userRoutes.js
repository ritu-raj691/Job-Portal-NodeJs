import express from "express";
import { userController, getAllUsers } from "../controller/userController.js";
import { userAuthentication } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routes

//GET USERS
router.get("/users", userAuthentication, getAllUsers);

//UPDATE USER
router.put("/update", userAuthentication, userController);

export default router;
