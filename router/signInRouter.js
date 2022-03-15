import express from "express";
import { signIn, verifyUserToken } from "../controller/signInController.js";

// validator 와 controller 로만 구성

const router = express.Router();

router.post("/", signIn);
router.post("/verify", verifyUserToken);
export default router;
