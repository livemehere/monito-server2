import pool from "../db/database.js";

export async function getUserById(req, res) {
  const id = req.params.id;
  const sql = `SELECT * FROM user WHERE id=${id}`;
  const result = await pool.query(sql);
  res.status(200).json(result[0][0]);
}
