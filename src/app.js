import {} from 'dotenv/config';
import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";
const app = express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))


app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())



//routes import

import userRouter from './routes/user.routes.js'
import bookingRouter from './routes/booking.routes.js'



//routes declaration 
app.use("/auth", userRouter);
app.use("/bkg", bookingRouter);


export {app}