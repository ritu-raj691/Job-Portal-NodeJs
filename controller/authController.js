import userModel from "../models/userModel.js";

export const authController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      //   return res
      //     .status(400)
      //     .send({ success: false, message: "Please provide name" });
      next("Name is required."); //using middleware
    }
    if (!email) {
      //   return res
      //     .status(400)
      //     .send({ success: false, message: "Please provide email" });
      next("Email is required."); // using middleware
    }
    if (!password) {
      //   return res
      //     .status(400)
      //     .send({ success: false, message: "Please provide password" });
      next(
        "Password is required and should be greater than or equal to 6 character."
      ); // using middleware
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      //   res
      //     .status(200)
      //     .send({ success: false, message: "User already exist. Please login!" });
      next("User already exist. Please login!"); // using middleware
      return;
    }
    const user = await userModel.create({ name, email, password });

    //Token Creation
    const token = user.createJWT();
    res.status(201).send({
      success: true,
      message: "User created successfully!",
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    // res.status(400).send({
    //   message: "Error in register controller",
    //   success: false,
    //   error,
    // });
    next(error); //using middleware: next function
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) return next("Please provide email");
    if (!password) return next("Please provide password");

    //find user by email
    const user = await userModel.findOne({ email });
    if (!user) return next("Invalid username or password");

    //compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) return next("Invalid username or password");

    //Token generation
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Successfully Logged In",
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    console.log("Login Controller Error: ", error);
    next(error);
  }
};
