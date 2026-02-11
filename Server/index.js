import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import bookingRoute from './Routes/bookingRoute.js';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import http from 'http';
import initSocket from './Socket/socket.js';

const app = express();

const server = http.createServer(app);

const conn =  mongoose.connect(process.env.MONGODB_URL);

conn && console.log('DB connected successfully!');

const FRONTEND_URL = "https://futsal-booking-system-azure.vercel.app"


app.use(json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

//socket
const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL
    }
});

initSocket(io);


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/booking', bookingRoute);


server.listen(5000, () => {
    console.log('Server is running on port 5000');
});