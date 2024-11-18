import express from "express";
import { userAuthentication } from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
  deleteJobController,
  statsJobController,
} from "../controller/jobController.js";

//router object
const router = express.Router();

//routes

//CREATE JOBS || POST
router.post("/create-job", userAuthentication, createJobController);

//GET JOBS || GET
router.get("/jobs", userAuthentication, getAllJobsController);

//UPDATE JOB || PUT/PATCH
router.put("/update/:id", userAuthentication, updateJobController);

//DELETE JOB || DELETE
router.delete("/delete/:id", userAuthentication, deleteJobController);

//STATS FILTER || GET
router.get("/stats", userAuthentication, statsJobController);

export default router;
