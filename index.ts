import express from 'express';
import { Application } from "express";
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors'
const app: Application = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET, POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join-channel", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.channel).emit("receive_message", data.message);
    });

    socket.on("send_deleted_message", (data) => {
        socket.to(data.channel).emit("delete_message", data.messageId);
    })
});

server.listen(process.env.PORT, () => console.log("server is running"));
