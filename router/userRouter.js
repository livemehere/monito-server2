import express from "express";
import { getUserById } from "../controller/userController.js";

const router = express.Router();

router.get("/:id", getUserById);

router.post("/", (req, res) => {
  res.send("post user");
});

router.put("/", (req, res) => {
  res.send("put user");
});

router.delete("/", (req, res) => {
  res.send("delete user");
});

export default router;
