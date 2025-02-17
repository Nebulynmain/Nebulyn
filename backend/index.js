import express from 'express';
import dotenv from 'dotenv'
import connect from './config/db.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000 ;

app.get("/", (req,res)=>{
    res.send("Hello");
})

app.listen(PORT, async()=>{
    await connect();
    console.log("Server started");
})