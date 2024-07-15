// src/db.ts
import * as mysql from 'mysql';
import dbConfig from '../config/dbConfig';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

const executeQuery = <T>(query: string, params: any[] = []): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        console.error('Database error:', error);
        reject(new Error('Database error'));
      } else {
        resolve(results);
      }
    });
  });
};

const functions = {
  pool,
  executeQuery
}

export default functions;