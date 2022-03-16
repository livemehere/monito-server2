import express from "express";
import {body} from "express-validator";
import {createRecordData, deleteRecordData, getRecordData, updateRecordData} from "../controller/recordController.js";

// validator 와 controller 로만 구성

const router = express.Router();

router.get("/:id", getRecordData);
router.post("/",body(['id','name']).notEmpty(), createRecordData);
router.put("/",body(['id','cumulative_time','endDate']).notEmpty(), updateRecordData);
router.delete("/",body('id').notEmpty(), deleteRecordData);
export default router;
