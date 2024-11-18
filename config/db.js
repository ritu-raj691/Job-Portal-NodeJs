import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_CONNECTION_STR);
    console.log(`MongoDB database connected ${mongoose.connection.host}`); //mongoose.connection.host will show the cluster name
  } catch (error) {
    console.log(`MongoDB database connection error: ${error}`);
  }
};

export default connectDB;
