import db from "../db/db";

// getAll: get table data from database
const getAll = <T>(table: string): Promise<T[]> => {
  return db.executeQuery<T[]>(`SELECT * FROM ${table}`);
};

// getByParam: get element in database table through param
const getByParam = async <T>(
  table: string,
  param: string,
  value: string
): Promise<T | undefined> => {
  try {
    const results = await db.executeQuery<T[]>(
      `SELECT * FROM ${table} WHERE ${param} = ?`,
      [value]
    );
    return results[0];
  } catch {
    return undefined;
  }
};

// addToTable: add new data to database table
const addToTable = async (table: string, data: object): Promise<number> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => "?").join(", ");

  const result = await db.executeQuery<any>(
    `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`,
    values
  );
  return result.insertId;
};

// updateInTable: update element data in database table through id
const updateInTable = async (
  table: string,
  id: number,
  data: object
): Promise<void> => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key) => `${key} = ?`).join(", ");

  return db.executeQuery<void>(
    `UPDATE ${table} SET ${setString} WHERE id = ?`,
    [...values, id]
  );
};

// removeFromTable: remove element in database table through id
const removeFromTable = async (table: string, id: number): Promise<void> => {
  if (table === "favoritos") {
    return db.executeQuery<void>(
      `DELETE FROM favoritos WHERE id_startup = ? OR id_utilizador = ?`,
      [id, id]
    );
  }
  return db.executeQuery<void>(`DELETE FROM ${table} WHERE id = ?`, [id]);
};

const functions = {
  getAll,
  getByParam,
  addToTable,
  updateInTable,
  removeFromTable,
};

export default functions;
