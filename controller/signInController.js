import pool from "../db/database.js";
import { createToken, verifyToken } from "../util/token.js";

/**
 * TODO: 유효성 검사 필요하면 추가
 * if (CheckValidator(req, res)) return;
 * */

export async function signIn(req, res) {
  const { email, password } = req.body;
  let result;
  try {
    const sql = `SELECT * FROM user WHERE email='${email}' and password='${password}'`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (!result[0][0])
    return res
      .status(400)
      .json({ res: "fail", msg: "존재하지 않는 유저입니다." });

  const newToken = await createToken(result[0][0]);

  res.status(200).send(newToken);
}

export async function verifyUserToken(req, res) {
  const { token } = req.body;
  const result = await verifyToken(token);
  res.send(result);
}
