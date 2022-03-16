import express from "express";
import config from "./config.js";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./router/userRouter.js";
import signInRouter from "./router/signInRouter.js";
import timeRouter from "./router/timeRouter.js";
import recordRouter from "./router/recordRouter.js";
import calendarRouter from "./router/calendarRouter.js";
import roomRouter from "./router/roomRouter.js";
import userRoomRouter from "./router/userRoomRouter.js";

const app = express();

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

app.listen(config.port, () => {
  console.log(`server is running on ${config.port}`);
});

// 404
app.use((req, res, next) => {
  res.sendStatus(404);
});
