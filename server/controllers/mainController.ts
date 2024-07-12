import {executeQuery} from '../db/db';

export const getAll = <T>(table: string): Promise<T[]> => {
  return executeQuery<T[]>(`SELECT * FROM ${table}`);
};

export const getById = <T>(table: string, id: number): Promise<T | undefined> => {
  return executeQuery<T[]>(`SELECT * FROM ${table} WHERE id = ?`, [id])
    .then(results => results[0]);
};

export const getByUsername = <T>(table: string, username: string): Promise<T | undefined> => {
  return executeQuery<T[]>(`SELECT * FROM ${table} WHERE username = ?`, [username])
    .then((results) => results[0]) // Return the first user or undefined
    .catch(() => undefined);
};

export const addToTable = (table: string, data: object): Promise<number> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');

  return executeQuery<any>(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`, values
  ).then(result => result.insertId);
};

export const updateInTable = (table: string, id: number, data: object): Promise<void> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map(key => `${key} = ?`).join(', ');

  return executeQuery<void>(
    `UPDATE ${table} SET ${setString} WHERE id = ?`, [...values, id]
  );
};

export const removeFromTable = (table: string, id: number): Promise<void> => {
  if (table === 'favoritos') {
    return executeQuery<void>(`DELETE FROM favoritos WHERE id_startup = ? OR id_utilizador = ?`, [id, id])
  }
  return executeQuery<void>(`DELETE FROM ${table} WHERE id = ?`, [id]);
};


const functions = {
  getAll,
  getById,
  add: addToTable
}

export default functions;