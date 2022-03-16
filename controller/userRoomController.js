import pool from "../db/database.js";
import {CheckValidator} from "../util/vailidator.js";

/**
 * TODO: 유효성 검사 필요하면 추가
 * if (CheckValidator(req, res)) return;
 * */

export async function joinRoom(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  if (CheckValidator(req, res)) return;
  const { user_id,room_id } = req.body;
  let result;
  try {
    const sql = `INSERT INTO userRoom values( ${user_id},${room_id});`;

    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  res.status(200).send({res:'success',msg:'join 성공'});
}

export async function outRoom(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  if (CheckValidator(req, res)) return;
  const { user_id,room_id } = req.body;

  let result;
  try {
    const sql = `DELETE FROM userRoom WHERE userid= ${user_id} and study_group_id= ${room_id}`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if(result[0].affectedRows == 0) return res.status(400).json({res:'fail',msg:'해당 관계가 존재하지 않습니다'});

  res.status(200).send({res:'success',msg:'room 나가기 성공'});
}

