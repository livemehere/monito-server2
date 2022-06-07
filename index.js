import express from "express";
import config from "./config.js";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import https from 'https';
import http from 'http';
import fs from 'fs';

import userRouter from "./router/userRouter.js";
import signInRouter from "./router/signInRouter.js";
import timeRouter from "./router/timeRouter.js";
import recordRouter from "./router/recordRouter.js";
import calendarRouter from "./router/calendarRouter.js";
import roomRouter from "./router/roomRouter.js";
import userRoomRouter from "./router/userRoomRouter.js";

const app = express();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/monito.ml/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/monito.ml/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/monito.ml/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

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
app.use('/record',recordRouter);
app.use('/calendar',calendarRouter);
app.use('/room',roomRouter);
app.use('/userRoom',userRoomRouter);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(3333, () => {
	console.log('HTTPS Server running on port 443');
});

// 404
app.use((req, res, next) => {
  res.sendStatus(404);
});
