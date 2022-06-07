import express from "express";
import config from "./config.js";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import https from "https";
import http from "http";
import fs from "fs";
import { Server } from "socket.io";

import userRouter from "./router/userRouter.js";
import signInRouter from "./router/signInRouter.js";
import timeRouter from "./router/timeRouter.js";
import recordRouter from "./router/recordRouter.js";
import calendarRouter from "./router/calendarRouter.js";
import roomRouter from "./router/roomRouter.js";
import userRoomRouter from "./router/userRoomRouter.js";

const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/monito.ml/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/monito.ml/cert.pem",
  "utf8"
);
const ca = fs.readFileSync("/etc/letsencrypt/live/monito.ml/chain.pem", "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

//socket
const io = new Server(httpsServer);
const users = {};
const socketToRoom = {};

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extension: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("monito server is on");
});

app.use("/api/user", userRouter);
app.use("/signIn", signInRouter);
app.use("/time", timeRouter);
app.use("/record", recordRouter);
app.use("/calendar", calendarRouter);
app.use("/room", roomRouter);
app.use("/userRoom", userRoomRouter);

httpServer.listen(3000, () => {
  console.log("HTTP Server running on port 3000");
});

httpsServer.listen(3333, () => {
  console.log("HTTPS Server running on port 3333");
});

// 404
app.use((req, res, next) => {
  res.sendStatus(404);
});

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 10) {
        //인원 최대 10명까지
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
    socket.broadcast.emit("user left", socket.id);
  });

  socket.on("change", (payload) => {
    socket.broadcast.emit("change", payload);
  });
});
