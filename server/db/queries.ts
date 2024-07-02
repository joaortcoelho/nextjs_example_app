import { query } from './db';
import { Startup } from '../models/Startup';

export async function getAllStartups(): Promise<Startup[]> {
  const sql = 'SELECT * FROM startup';
  const startups = await query(sql);
  return startups as Startup[];
}

export async function getStartupById(id: number): Promise<Startup | null> {
  const sql = 'SELECT * FROM startup WHERE id = ?';
  const startups = await query(sql, [id]);
  return startups[0] || null;
}

export async function addStartup(nome: string): Promise<number> {
  const sql = 'INSERT INTO startup (nome) VALUES (?)';
  const result = await query(sql, [nome]);
  return result.insertId;
}

export async function updateStartup(id: number, nome: string): Promise<void> {
  const sql = 'UPDATE startup SET nome = ? WHERE id = ?';
  await query(sql, [nome, id]);
}

export async function deleteStartup(id: number): Promise<void> {
  const sql = 'DELETE FROM startup WHERE id = ?';
  await query(sql, [id]);
}

export async function getFavoritosDoUtilizador(idUtilizador: number): Promise<number[]> {
  const sql = 'SELECT id_startup FROM favoritos WHERE id_utilizador = ?';
  const favoritos = await query(sql, [idUtilizador]);
  return favoritos.map((row: any) => row.id_startup);
}

export async function adicionarFavorito(idUtilizador: number, idStartup: number): Promise<void> {
  const sql = 'INSERT INTO favoritos (id_utilizador, id_startup) VALUES (?, ?)';
  await query(sql, [idUtilizador, idStartup]);
}

export async function removerFavorito(idUtilizador: number, idStartup: number): Promise<void> {
  const sql = 'DELETE FROM favoritos WHERE id_utilizador = ? AND id_startup = ?';
  await query(sql, [idUtilizador, idStartup]);
}

export async function verificarFavorito(idUtilizador: number, idStartup: number): Promise<boolean> {
  const sql = 'SELECT 1 FROM favoritos WHERE id_utilizador = ? AND id_startup = ? LIMIT 1';
  const result = await query(sql, [idUtilizador, idStartup]);
  return result.length > 0;
}
