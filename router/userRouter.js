import express from "express";
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { body, check } from "express-validator";

// validator 와 controller 로만 구성

const router = express.Router();

router.get("/:id", getUserById);

router.post(
  "/",
  [
    body(["id", "email", "password", "password_check", "name", "birth", "job"])
      .notEmpty()
      .trim(),
    check("email").isEmail(),
    body("password").custom((value, { req }) => {
      if (value !== req.body.password_check) {
        throw new Error("비밀번호가 일치하지 않습니다");
      }
      return true;
    }),
  ],
  createUser
);

router.put(
  "/",
  [
    body(["email", "password", "name", "birth", "job"]).notEmpty().trim(),
    check("email").isEmail(),
  ],
  updateUser
);

router.delete("/:id", deleteUser);

export default router;
