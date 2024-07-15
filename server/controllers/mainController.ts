import db from '../db/db';

// getAll: get table data from database
export const getAll = <T>(table: string): Promise<T[]> => {
  return db.executeQuery<T[]>(`SELECT * FROM ${table}`);
};

// getById: get element in database table through id
export const getById = <T>(table: string, id: number): Promise<T | undefined> => {
  return db.executeQuery<T[]>(`SELECT * FROM ${table} WHERE id = ?`, [id])
    .then(results => results[0]);
};

// getByUsername: get element in database table through username
export const getByUsername = <T>(table: string, username: string): Promise<T | undefined> => {
  return db.executeQuery<T[]>(`SELECT * FROM ${table} WHERE username = ?`, [username])
    .then((results) => results[0]) // Return the first user or undefined
    .catch(() => undefined);
};

// addToTable: add new data to database table
export const addToTable = (table: string, data: object): Promise<number> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');

  return db.executeQuery<any>(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`, values
  ).then(result => result.insertId);
};

// updateInTable: update element data in database table through id
export const updateInTable = (table: string, id: number, data: object): Promise<void> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map(key => `${key} = ?`).join(', ');

  return db.executeQuery<void>(
    `UPDATE ${table} SET ${setString} WHERE id = ?`, [...values, id]
  );
};

// removeFromTable: remove element in database table through id
export const removeFromTable = (table: string, id: number): Promise<void> => {
  if (table === 'favoritos') {
    return db.executeQuery<void>(`DELETE FROM favoritos WHERE id_startup = ? OR id_utilizador = ?`, [id, id])
  }
  return db.executeQuery<void>(`DELETE FROM ${table} WHERE id = ?`, [id]);
};


const functions = {
  getAll,
  getById,
  getByUsername,
  addToTable,
  updateInTable,
  removeFromTable
}

export default functions;