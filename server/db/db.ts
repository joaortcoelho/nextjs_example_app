// src/db.ts
import * as mysql from 'mysql';
import { dbConfig } from '../config/dbConfig';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

export default pool;