import express from "express";
import path from 'path'
import router from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();


const port = process.env.PORT || 3001;
connectDB()
const app=express()


app.use(express.static("backend/public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


app.use('/',router)

app.listen(port,()=>{
    console.log(`server connected to ${port}`)
})