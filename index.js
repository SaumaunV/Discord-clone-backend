"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
    });
});
server.listen(process.env.PORT, () => console.log("server is running on port " + process.env.PORT));
