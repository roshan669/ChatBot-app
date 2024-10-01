import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Highlighted changes start here
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true, // Changed from false to true
      domain: ".onrender.com", // Removed "https://"
      signed: true,
      path: "/",
      secure: true, // Added secure attribute
      sameSite: "lax", // Added sameSite attribute
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: ".onrender.com", // Removed "https://"
      expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Changed from false to true
      signed: true,
      secure: true, // Added secure attribute
      sameSite: "lax", // Added sameSite attribute
    });
    // Highlighted changes end here

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    // Highlighted changes start here
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true, // Changed from false to true
      domain: ".onrender.com", // Removed "https://"
      signed: true,
      path: "/",
      secure: true, // Added secure attribute
      sameSite: "lax", // Added sameSite attribute
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: ".onrender.com", // Removed "https://"
      expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true, // Changed from false to true
      signed: true,
      secure: true, // Added secure attribute
      sameSite: "lax", // Added sameSite attribute
    });
    // Highlighted changes end here

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};


export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true, // Changed from false to true
      domain: ".onrender.com", // Removed "https://"
      signed: true,
      path: "/",
      secure: true, // Added secure attribute
      sameSite: "lax", // Added sameSite attribute
    });
    
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
