import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { Cloudinary } from "../cloudinary/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();
export const register = async (req, res, next) => {

  const { username, email, profilePic } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    if(profilePic){
      const uploadedImg = await Cloudinary.uploader.upload(req.body.profilePic,  {
        upload_preset: "User_Avatar" 
      })
      if (uploadedImg) {
        const newUser = new User({
          username,
          email,
          profilePic: uploadedImg.secure_url, 
          password: hash,
        });
        await newUser.save();
        res.status(200).send("User has been created.");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};
