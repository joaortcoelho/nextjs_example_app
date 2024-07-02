// src/db.ts
import * as mysql from 'mysql';
import { dbConfig } from '../config/dbConfig';

const pool = mysql.createPool(dbConfig);

export const query = (sql: string, values?: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

export default pool;