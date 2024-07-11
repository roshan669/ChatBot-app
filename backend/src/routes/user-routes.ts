import { Router } from "express";
import appRouter from "./index.js";
import { getAllUsers } from "../controllers/user-controller.js";

const userRoutes=Router();

userRoutes.get("/",getAllUsers);

export default userRoutes;