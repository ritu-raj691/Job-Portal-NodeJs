//const express = require("express"); //common js
import express from "express";
import cors from "cors";
import morgan from "morgan";
//Security packages
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import dotConfig from "dotenv";
import connectDB from "./config/db.js";
import testRouter from "./routes/testRoutes.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
import jobRoute from "./routes/jobRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// dotenv config
dotConfig.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/v1/api", testRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/job", jobRoute);

//validation middleware
app.use(errorMiddleware);

//routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Job Portal Project</h1>");
});

const PORT = process.env.PORT || 5001;

//server
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on PORT: ${PORT}`
  );
});
