import { Router } from "express";
import appRouter from "./index.js";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";



const userRoutes=Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signupValidator),userSignup);
userRoutes.post("/login",validate(loginValidator),userLogin);
export default userRoutes;