import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req,res,next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("token")

    if (!token) {
      console.log("Unathorized access");
      
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
        console.log("Unathorized access");
    }

    const user = await User.findById(decoded._id).select(
      "-password"
    );

    if (!user) {
        console.log("Unathorized access");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default isLoggedIn
