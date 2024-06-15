import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



app.listen(process.env.PORT, () => {
    console.log(`Server is running on  http://localhost:${process.env.PORT}`);
});