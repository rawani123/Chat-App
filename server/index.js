import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',userRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server is running on  http://localhost:${process.env.PORT}`);
});