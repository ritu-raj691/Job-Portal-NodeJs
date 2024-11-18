import mongoose from "mongoose";

//Job Schema
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required!"],
    },
    position: {
      type: String,
      required: [true, "Job position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "interview", "selected"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      default: "Full-Time",
    },
    jobLocation: {
      type: String,
      default: "Pune",
    },
    createdBy: {
      //who created the job: taking from the User schema(created in userModel.js file)
      type: mongoose.Types.ObjectId, //In mongoose, the relationships are maintained by ObjectId
      ref: "User", //Table name reference from which you want to get the detail (Here, table name is "User", created in userModel.js file)
    },
  },
  { timestamps: true }
);

export default mongoose.model("job", jobSchema);
