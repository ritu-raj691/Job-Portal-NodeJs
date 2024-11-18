import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";

//Create Job
export const createJobController = async (req, res, next) => {
  try {
    const { company, position } = req.body;
    if (!company) return next("Please provide company name");
    if (!position) return next("Please provide position");

    req.body.createdBy = req?.user?.userId; //assigning user's table userId to createdBy field, so that we will get to know who has created the job
    const job = await jobModel.create(req.body);
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("createJobController Error: ", error);
    next(error);
  }
};

//Get all the jobs
export const getAllJobsController = async (req, res, next) => {
  try {
    const { status, jobType, search, sort } = req.query;
    //conditions for searching filters
    const queryObject = {
      createdBy: req?.user?.userId,
    };
    //logic for status filter
    if (status && status !== "all") {
      queryObject.status = status;
    }

    //logic for jobType filter
    if (jobType && jobType !== "all") {
      queryObject.jobType = jobType;
    }

    //logic for position filter (search based on any matching words)
    if (search) {
      queryObject.position = { $regex: search, $options: "i" }; //no case sensitive
    }

    let queryResult = jobModel.find(queryObject);

    //Sorting
    if (sort === "latest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "a-z") {
      queryResult = queryResult.sort("position");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("-position");
    }

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);

    //jobs count
    const totalJobs = await jobModel.countDocuments(queryResult);
    const numofPage = Math.ceil(totalJobs / limit);

    const jobs = await queryResult;
    res.status(201).json({
      success: true,
      totalJobs: jobs?.length,
      jobs,
      numofPage,
    });
  } catch (error) {
    console.log("getAllJobsController Error: ", error);
    next(error);
  }
};

//Update selected job
export const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, position, status, jobType, jobLocation } = req.body;

    if (!company) return next("Please provide company name!");
    if (!position) return next("Please provide position!");
    if (!status) return next("Please provide status!");
    if (!jobType) return next("Please provide job type!");
    if (!jobLocation) return next("Please provide job location!");

    const job = await jobModel.findOne({ _id: id });

    if (!job) return next("No job found with id: " + id);

    //Person who has created the job, only that person can updated the job details
    if (req.user.userId !== job.createdBy?.toString()) {
      return next("You are not authorized to update the job!");
    }

    const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true, // Helps in updating
      runValidators: true, //if extra values(not defined in job schema) come in req.body then it will not update
    });

    res.status(200).json({
      success: true,
      message: "Job successfully updated!",
      updateJob,
    });
  } catch (error) {
    console.log("updateJobController Error: ", error);
    next(error);
  }
};

//Delete selected job
export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findOne({ _id: id });

    if (!job) return next("No job found with id: " + id);

    //Person who has created the job, only that person can delete that job
    if (req.user.userId !== job.createdBy?.toString()) {
      return next("You are not authorized to delete the job!");
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job successfully deleted!",
    });
  } catch (error) {
    console.log("deleteJobController Error: ", error);
    next(error);
  }
};

//Job stats filter controller
export const statsJobController = async (req, res, next) => {
  try {
    const stats = await jobModel.aggregate([
      [
        // Search by user jobs (who created the jobs)
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(req.user.userId.toString()),
          },
        },
        {
          $group: { _id: "$status", count: { $sum: 1 } },
        },
      ],
    ]);

    // Yearly and Monthly stats
    const yearlyMonthlyStats = await jobModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId.toString()),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalStats: stats?.length,
      stats,
      yearlyMonthlyStats,
    });
  } catch (error) {
    console.log("statsJobController Error: ", error);
    next(error);
  }
};
