import express from "express";
import {body} from "express-validator";
import {joinRoom, outRoom} from "../controller/userRoomController.js";

// validator 와 controller 로만 구성

const router = express.Router();

router.post("/",body(['user_id','room_id']).notEmpty(), joinRoom);
router.delete("/",body(['user_id','room_id']).notEmpty(), outRoom);
export default router;
