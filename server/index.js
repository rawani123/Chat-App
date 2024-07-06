import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import { Server as io } from 'socket.io'; // Destructure named export "Server"

dotenv.config();

connectDB();

const app = express();

app.use(cors(
  {
    origin: "*",
    credentials: true
  }
));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/messages', messagesRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

const socketIo = new io(server, {
  cors: {
    origin: "*", // Adjust origin as needed (e.g., 'http://localhost:3000')
    credentials: true,
  },
});

global.onlineUsers = new Map();

// Manage online users using a more suitable data structure (e.g., a database or in-memory store)

socketIo.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
        
      }
    });
  });