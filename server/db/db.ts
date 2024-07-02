// src/db.ts
import * as mysql from 'mysql';
import { dbConfig } from '../config/dbConfig';

const pool = mysql.createPool(dbConfig);

export const query = (sql: string | mysql.QueryOptions, values: any[] = []): Promise<any> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            connection.query(sql, values, (err, result) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
};
