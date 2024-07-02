// src/services/startupService.ts
import { query } from "../db/db";

export const getAllFromTable = async (table: string): Promise<any[]> => {
    try {
        const sql = `SELECT * FROM ??`;
        const result = await query(sql, [table]);
        return result;
    } catch (err) {
        console.error(`Error in getAllFromTable for table '${table}':`, err);
        throw new Error('Error fetching data');
    }
};

export const getAllFromTableByParameter = async (table: string, field: string, parameter: string | number): Promise<any[]> => {
    try {
        const sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const result = await query(sql, [table, field, parameter]);
        return result;
    } catch (err) {
        console.error(`Error in getAllFromTableByParameter for table '${table}', field '${field}', parameter '${parameter}':`, err);
        throw new Error('Error fetching data');
    }
};
