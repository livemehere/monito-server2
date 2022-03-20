import pool from "../db/database.js";
import {CheckValidator} from "../util/vailidator.js";

/**
 * TODO: 유효성 검사 필요하면 추가
 * if (CheckValidator(req, res)) return;
 * */

export async function createTimeData(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  if (CheckValidator(req, res)) return;
  const { id } = req.body;
  let result;
  try {
    const sql = `INSERT INTO time values(default,default,default,${id});`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if(result[0].affectedRows === 0) return res.status(400).send(result);

  res.status(200).send(result);
}

export async function getTimeData(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  const {id} = req.params;
  let result;
  try {
    const sql = `SELECT * FROM time WHERE id='${id}'`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if(!result[0][0]) return res.status(400).send('해당 ID의 time 데이터가 존재하지 않습니다');

  res.status(200).send(result[0][0]);
}

export async function updateTimeData(req,res){
  const {id,total_time,focus_time} = req.body;

  if (CheckValidator(req, res)) return;

  let result;
  try {
    const sql = `UPDATE time SET total_time = ${total_time}, focus_time =${focus_time} WHERE user_id = '${id}'`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if(result[0].affectedRows === 0) return res.status(400).json({res:'fail',msg:'해당 ID의 유저가 존재하지 않습니다'});

  res.status(200).json({res:'success',msg:'업데이트 성공'})
}

export async function deleteTimeData(req,res){
  if (CheckValidator(req, res)) return;

  const {id} = req.body;
  let result;
  try {
    const sql = `DELETE FROM time WHERE user_id =${id}`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if(result[0].affectedRows === 0) return res.status(400).json({res:'fail',msg:'해당 ID의 유저가 존재하지 않습니다'});

  res.status(200).json({res:'success',msg:'데이터 삭제 성공'})
}