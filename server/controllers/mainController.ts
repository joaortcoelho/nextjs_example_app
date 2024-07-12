import pool from '../db/db';

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

export const getAll = <T>(table: string): Promise<T[]> => {
  return executeQuery<T[]>(`SELECT * FROM ${table}`);
};

export const getById = <T>(table: string, id: number): Promise<T | undefined> => {
  return executeQuery<T[]>(`SELECT * FROM ${table} WHERE id = ?`, [id])
    .then(results => results[0]);
};

export const add = (table: string, data: object): Promise<number> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');

  return executeQuery<any>(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`, values
  ).then(result => result.insertId);
};

export const update = (table: string, id: number, data: object): Promise<void> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map(key => `${key} = ?`).join(', ');

  return executeQuery<void>(
    `UPDATE ${table} SET ${setString} WHERE id = ?`, [...values, id]
  );
};

export const remove = (table: string, id: number): Promise<void> => {
  return executeQuery<void>(`DELETE FROM ${table} WHERE id = ?`, [id]);
};
