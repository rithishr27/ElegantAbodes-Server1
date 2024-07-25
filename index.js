import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './Routes/authRoute.js';
import cors from 'cors';
import path from "path";
import updateRouter from './Routes/userRoute.js';
import listingRoute from './Routes/listingRoute.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://elegant-abodes.onrender.com',
    credentials: true
}));

app.listen(3000 , ()=>{
    console.log("Server is Connected...!!!");
    mongoose.connect(process.env.MongoDB).
    then(() => {
        console.log("DB Connected...!!!");
    })
    .catch((err) => {
        console.log(err);
    })
})

app.use('/api/auth',authRouter);
app.use('/api/user',updateRouter);
app.use('/api/listing',listingRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err,req,res,next) => {
    // console.log(err.message);
    const sourceCode = err.sourceCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(sourceCode).json({
        success : false,
        sourceCode,
        message
    });
});
