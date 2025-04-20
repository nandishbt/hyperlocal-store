import User from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";
import { validateEmail, ValidatePhone } from "../utils/validators.js";

const registerUser = async (req, res) => {
  try {
    const { username, fullname, email, password, phone } = req.body;

    if (!username || !fullname || !email || !password || !phone) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "All fields Required"));
    }

    if (!validateEmail(email)) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "Email is not in correct format"));
    }

    if (!ValidatePhone(phone)) {
      return res
        .status(404)
        .json(
          new apiResponse(false, 404, "phone number is not in correct format")
        );
    }

    const user = await User.create({
      username: username.toLowerCase(),
      fullname: fullname.toLowerCase(),
      email: email.toLowerCase(),
      phone: Number(phone),
      password,
    });

    const createdUser = await User.findById(user._id);

    if (!createdUser) {
      return res
        .status(400)
        .json(new apiResponse(false, 400, "Error saving user to database"));
    }

    return res.status(201).json(new apiResponse(true, 200,"User Registered successfully", createdUser));
  } catch (error) {
    return res.status(501).json({
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // console.log(email);

    if (!email && !username) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "please enter email or username"));
    }

    if (!password) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "please enter password"));
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res
        .status(404)
        .json(
          new apiResponse(false, 404, "Invalid username/email or password")
        );
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "Password is incorrect"));
    }

    const token = await user.generateAccessToken();

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      //make sure that only server can set and alter cookies
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json(
        new apiResponse(true, 201, "user logged in successfully", {
          token,
          user: loggedInUser,
        })
      );
  } catch (error) {
    return res.status(501).json({
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "Can't find user"));
    }
    return res
      .status(200)
      .json(new apiResponse(true, 201, "User Fetched successfully", user));
  } catch (error) {
    return res.status(501).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, username, fullname } = req.body;

    if (!email || !username || !fullname) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "All fields required"));
    }

    if (!validateEmail(email)) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "please enter correct email format"));
    }

    const userUpdated = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          fullname: fullname.toLowerCase(),
        },
      },
      {
        new: true,
      }
    );

    const newUser = await User.findById(userUpdated._id)

    if(!newUser){
        return res.status(404).json(new apiResponse(false,404,"error updating user"))
    }
    return res.status(200).json(new apiResponse(true,201,"user updated successfully", newUser))
  } catch (error) {
    return res.status(501).json({
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const options = {
        httpOnly: true,
        secure: true,
      };

    return res.status(200)
    .clearCookie('accessToken', options)
    .json(new apiResponse(true,201,"User Logout Success"))

  } catch (error) {
    return res.status(501).json({
      error: error.message,
    });
  }
};

export { registerUser, loginUser, getUser, updateUser, logoutUser };
