import express from 'express';
import dotenv from 'dotenv'
import connect from './config/db.js';
import authRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import companyRouter from './routes/companyRoute.js';
import jobRouter from './routes/jobRoute.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000 ;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Hello");
})

app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);

app.listen(PORT, async()=>{
    await connect();
    console.log("Server started");
})