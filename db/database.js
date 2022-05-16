import mysql from "mysql2";
import config from "../config.js";

const pool = mysql.createPool({
  host: config.db.host,
  password: config.db.password,
  user: config.db.user,
  database: config.db.database,
  port: config.db.db_port,
  connectionLimit: 10,
});


export default pool.promise();
