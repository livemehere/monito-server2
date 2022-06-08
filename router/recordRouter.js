import express from "express";
import { body } from "express-validator";
import {
  createRecordData,
  deleteRecordData,
  getRecordData,
} from "../controller/recordController.js";

// validator 와 controller 로만 구성

const router = express.Router();

router.get("/:id", getRecordData);
router.post(
  "/",
  body(["user_id", "name", "focus_time", "unfocus_time", "content"]).notEmpty(),
  createRecordData
);
router.delete("/", body("id").notEmpty(), deleteRecordData);
export default router;
