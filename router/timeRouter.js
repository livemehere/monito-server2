import express from "express";
import {createTimeData, deleteTimeData, getTimeData, updateTimeData} from "../controller/timeController.js";
import {body} from "express-validator";

// validator 와 controller 로만 구성

const router = express.Router();

router.get("/:id", getTimeData);
router.post("/",body('id').notEmpty(), createTimeData);
router.put("/",body(['id','total_time','focus_time']).notEmpty(), updateTimeData);
router.delete("/",body('id').notEmpty(), deleteTimeData);
export default router;
