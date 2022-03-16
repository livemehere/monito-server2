import express from "express";
import {body} from "express-validator";
import {createRoom, deleteRoom, getRoom, updateRoom} from "../controller/roomController.js";

// validator 와 controller 로만 구성

const router = express.Router();

router.get("/:id", getRoom);
router.post("/",body(['roomName','max_member']).notEmpty(), createRoom);
router.put("/",body(['id','is_recruit','now_member','focus_point','total_time']).notEmpty(), updateRoom);
router.delete("/",body('id').notEmpty(), deleteRoom);
export default router;
