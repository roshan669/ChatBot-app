import express from "express";
import {config} from 'dotenv'

import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"

config();


const app=express();

app.use(cors({
    origin:"https://chatbot-app-7s11.onrender.com",
    credentials:true,
    methods: ['GET', 'POST']
}))

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove it in production


app.use("/api/v1",appRouter);
export default app;