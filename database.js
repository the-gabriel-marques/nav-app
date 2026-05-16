import * as SQLite from 'expo-sqlite';

export async function getDBConnection() {
  return await SQLite.openDatabaseAsync('sistema_integrado.db');
}

export async function initDatabase() {
  const db = await getDBConnection();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
}

export async function cadastrarUsuario(username, password) {
  const db = await getDBConnection();
  try {
    await db.runAsync('INSERT INTO usuarios (username, password) VALUES (?, ?);', username, password);
    return { success: true };
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return { success: false, error: 'Este nome de usuário já está em uso ou ocorreu um erro.' };
  }
}

export async function validarLogin(username, password) {
  const db = await getDBConnection();
  const row = await db.getFirstAsync('SELECT * FROM usuarios WHERE username = ? AND password = ?;', username, password);
  if (row) {
    return { success: true, user: row };
  }
  return { success: false };
}

export async function alterarSenha(username, newPassword) {
  const db = await getDBConnection();
  try {
    await db.runAsync('UPDATE usuarios SET password = ? WHERE username = ?;', newPassword, username);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return { success: false };
  }
}