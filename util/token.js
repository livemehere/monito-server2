import jwt from "jsonwebtoken";
import config from "../config.js";

export async function createToken({ id, email, password, name, birth, job, profile_img }) {
  try {
    const token = jwt.sign({ id, email, password, name, birth, job, profile_img }, config.jwt.privateKey);
    return token;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, config.jwt.privateKey);
    return decoded;
  } catch (e) {
    return { res: "fail", msg: e.message };
  }
}
