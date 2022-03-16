import pool from "../db/database.js";
import { CheckValidator } from "../util/vailidator.js";

/**
 * TODO: 유효성 검사 필요하면 추가
 * if (CheckValidator(req, res)) return;
 * */

export async function getUserById(req, res) {
  const id = req.params.id;
  let result;
  try {
    const sql = `SELECT * FROM user WHERE id=${id}`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  res.status(200).json(result[0][0]);
}

export async function createUser(req, res) {
  if (CheckValidator(req, res)) return;

  try {
    const sql = `INSERT INTO user (email, password, name, birth, job) VALUES ('${req.body.email}', '${req.body.password}', '${req.body.name}', '${req.body.birth}', '${req.body.job}')`;
    const result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  res.status(200).json({ res: "success", msg: "유저 생성 성공" });
}

export async function updateUser(req, res) {
  if (CheckValidator(req, res)) return;

  try {
    const sql = `UPDATE user SET email = '${req.body.email}', password = '${
      req.body.password
    }', name = '${req.body.name}', birth = '${req.body.birth}', job = '${
      req.body.job
    }' ${
      req.body.profile_img !== undefined
        ? `, profile_img = '${req.body.profile_img}'`
        : ""
    } WHERE (id = '${req.body.id}');
    `;
    console.log(sql);
    const result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  res.status(200).json({ res: "success", msg: "유저정보 업데이트 성공" });
}

export async function deleteUser(req, res) {
  let affectiveRows;
  try {
    const sql = `DELETE FROM user WHERE (id = '${req.params.id}')`;
    const result = await pool.query(sql);
    affectiveRows = result[0].affectedRows;
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (affectiveRows == 0)
    return res
      .status(400)
      .json({ res: "fail", msg: "유저가 존재하지 않습니다." });

  res.status(200).json({ res: "success", msg: "유저 삭제 성공" });
}
