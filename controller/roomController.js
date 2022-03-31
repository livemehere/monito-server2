import pool from "../db/database.js";
import { CheckValidator } from "../util/vailidator.js";

/**
 * TODO: 유효성 검사 필요하면 추가
 * if (CheckValidator(req, res)) return;
 * */

export async function createRoom(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  if (CheckValidator(req, res)) return;
  const { roomCode, roomName, max_member } = req.body;
  let result;
  try {
    const sql = `INSERT INTO study_group values(default,'${roomName}',true,${max_member},0,0,0,'${roomCode}')`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  res.status(200).send({ res: "success", msg: "생성 성공" });
}

export async function getRoom(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  const { id } = req.params;
  let result;
  try {
    const sql = `SELECT * FROM study_group WHERE id='${id}'`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (!result[0][0]) return res.status(400).send("해당 ID의 study_group 데이터가 존재하지 않습니다");

  res.status(200).send(result[0]);
}

export async function getAllRoom(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  let result;
  try {
    const sql = `SELECT * FROM study_group`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (!result[0][0]) return res.status(400).send("해당 ID의 study_group 데이터가 존재하지 않습니다");

  res.status(200).send(result[0]);
}

export async function updateRoom(req, res) {
  const { id, is_recruit, now_member, focus_point, total_time } = req.body;

  if (CheckValidator(req, res)) return;

  let result;
  try {
    const sql = `UPDATE study_group SET is_recruit=${is_recruit}, now_member=${now_member}, focus_point =${focus_point}, total_time= ${total_time} WHERE id = ${id}`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (result[0].affectedRows == 0)
    return res.status(400).json({ res: "fail", msg: "해당 ID의 study_group이 존재하지 않습니다" });

  res.status(200).json({ res: "success", msg: "업데이트 성공" });
}

export async function deleteRoom(req, res) {
  if (CheckValidator(req, res)) return;

  const { id } = req.body;
  let result;
  try {
    const sql = `DELETE FROM study_group WHERE id =${id}`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (result[0].affectedRows == 0)
    return res.status(400).json({ res: "fail", msg: "해당 ID의 study_group이 존재하지 않습니다" });

  res.status(200).json({ res: "success", msg: "데이터 삭제 성공" });
}
