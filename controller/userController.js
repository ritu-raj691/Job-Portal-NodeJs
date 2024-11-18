import userModel from "../models/userModel.js";

export const userController = async (req, res, next) => {
  try {
    const { name, email, location } = req.body;

    if (!name) return next("Please provide name!");
    if (!email) return next("Please provide email!");
    if (!location) return next("Please provide location!");

    const user = await userModel.findOne({ _id: req.user.userId });

    if (!user) return next("User does not exist!");

    user.name = name;
    user.email = email;
    user.location = location;

    await user.save();
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "User successfully updated!",
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    console.log("Error userController: ", error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({}); // Retrieve all users
    let processedUsers = [];
    (users || []).forEach((user) => {
      processedUsers.push({
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        location: user?.location,
      });
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: processedUsers,
    });
  } catch (error) {
    console.log("Error in getAllUsers: ", error);
    next(error);
  }
};
