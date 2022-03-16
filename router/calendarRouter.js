import express from "express";
import {body} from "express-validator";
import {createCalendar, deleteCalendar, getCalendar, updateCalendar} from "../controller/calendarController.js";

// validator 와 controller 로만 구성

const router = express.Router();

router.get("/:id", getCalendar);
router.post("/",body(['id','title','startDate','endDate','detail']).notEmpty(), createCalendar);
router.put("/",body(['id','title','startDate','endDate','detail']).notEmpty(), updateCalendar);
router.delete("/",body('id').notEmpty(), deleteCalendar);
export default router;
