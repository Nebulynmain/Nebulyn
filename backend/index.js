import express from 'express';
import dotenv from 'dotenv'
import connect from './config/db.js';
import authRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import companyRouter from './routes/companyRoute.js';
import jobRouter from './routes/jobRoute.js';
import applicationRouter from './routes/applicationRoute.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000 ;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  exposedHeaders: ['set-cookie'], // Headers that the frontend can read
  maxAge: 86400 // Cache preflight request results for 24 hours (in seconds)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Hello");
})

app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

app.listen(PORT, async()=>{
    await connect();
    console.log("Server started");
})