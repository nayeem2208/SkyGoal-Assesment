import express from "express";
import path from 'path'
import router from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();


const port = process.env.PORT || 3001;
connectDB()
const app=express()

app.use(express.static("backend/public"));

app.use('/',router)

app.listen(port,()=>{
    console.log(`server connected to ${port}`)
})