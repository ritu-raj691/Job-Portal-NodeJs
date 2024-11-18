import express from "express";
import { rateLimit } from "express-rate-limit";
import {
  authController,
  loginController,
} from "../controller/authController.js";

//IP Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const router = express.Router();

//routes

//REGRISTER || POST
router.post("/register", limiter, authController);

//LOGIN || POST
router.post("/login", limiter, loginController);
export default router;
