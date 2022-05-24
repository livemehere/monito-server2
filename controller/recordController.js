import pool from "../db/database.js";
import { CheckValidator } from "../util/vailidator.js";

/**
 * TODO: 유효성 검사 필요하면 추가
 * if (CheckValidator(req, res)) return;
 * */

export async function createRecordData(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  if (CheckValidator(req, res)) return;
  let { user_id, name, focus_time, unfocus_time } = req.body;
  let result;
  try {
    const getByName = await pool.query(
      `SELECT * FROM mydb.record where datediff(CURRENT_DATE(),date) = 0 and name='${name}';`
    );
    const isExist = getByName[0].length > 0;

    if (isExist) {
      //  이미 존재한다면
      pool.query(
        `UPDATE mydb.record SET total_time=total_time+${focus_time}+${unfocus_time},focus_time=focus_time+${focus_time},unfocus_time=unfocus_time+${unfocus_time} WHERE name='${name}' and datediff(CURRENT_DATE (),date) = 0;`
      );
    } else {
      //   존재하지 않느다면
      pool.query(
        `INSERT INTO mydb.record values(default,'${name}',${
          focus_time + unfocus_time
        },${focus_time},${unfocus_time},CURRENT_DATE(),${user_id})`
      );
    }

    result = isExist;
  } catch (e) {
    if (e) return res.json(e.message);
  }

  res.status(200).send({
    res: "success",
    msg: "생성 성공",
    created: !result,
    updated: result,
  });
}

export async function getRecordData(req, res) {
  // id = userId 유저가 존재하지 않느다면 생성하지 않음
  const { id } = req.params;
  let result;
  let time_sum;
  try {
    const sql = `SELECT * FROM record WHERE user_id='${id}'`;
    result = await pool.query(sql);
    time_sum = await pool.query(
      `select sum(total_time) as total_study_time,sum(focus_time) as total_focus_time, sum(unfocus_time) as total_unfocus_time  from mydb.record where user_id =${id};`
    );
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (!result[0][0])
    return res.status(400).send("해당 ID의 record 데이터가 존재하지 않습니다");

  res.status(200).send({ time_sum: time_sum[0], records: result[0] });
}

export async function deleteRecordData(req, res) {
  if (CheckValidator(req, res)) return;

  const { id } = req.body;
  let result;
  try {
    const sql = `DELETE FROM record WHERE id =${id}`;
    result = await pool.query(sql);
  } catch (e) {
    if (e) return res.json(e.message);
  }

  if (result[0].affectedRows == 0)
    return res
      .status(400)
      .json({ res: "fail", msg: "해당 ID의 record가 존재하지 않습니다" });

  res.status(200).json({ res: "success", msg: "데이터 삭제 성공" });
}
