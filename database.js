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
    CREATE TABLE IF NOT EXISTS historico_imc (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      peso REAL NOT NULL,
      altura REAL NOT NULL,
      imc REAL NOT NULL,
      resultado TEXT NOT NULL,
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS historico_pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    usuario_id INTEGER NOT NULL, 
    itens TEXT NOT NULL, 
    total REAL NOT NULL, 
    data TEXT NOT NULL
    );
  `);
}

export async function cadastrarUsuario(username, password) {
  const db = await getDBConnection();
  try {
    await db.runAsync('INSERT INTO usuarios (username, password) VALUES (?, ?);', username, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao cadastrar.' };
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
    return { success: false };
  }
}

export async function salvarIMC(usuarioId, peso, altura, imc, resultado) {
  const db = await getDBConnection();
  try {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    await db.runAsync(
      'INSERT INTO historico_imc (usuario_id, peso, altura, imc, resultado, data) VALUES (?, ?, ?, ?, ?, ?);',
      usuarioId,
      peso,
      altura,
      imc,
      resultado,
      dataAtual
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function obterHistoricoIMC(usuarioId) {
  const db = await getDBConnection();
  try {
    return await db.getAllAsync('SELECT * FROM historico_imc WHERE usuario_id = ? ORDER BY id DESC;', usuarioId);
  } catch (error) {
    return [];
  }
}
// CREATE TABLE IF NOT EXISTS historico_pedidos (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INTEGER NOT NULL, itens TEXT NOT NULL, total REAL NOT NULL, data TEXT NOT NULL);

export async function salvarPedido(usuarioId, itens, total) {
  const db = await getDBConnection();
  try {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    await db.runAsync(
      'INSERT INTO historico_pedidos (usuario_id, itens, total, data) VALUES (?, ?, ?, ?);',
      usuarioId,
      itens,
      total,
      dataAtual
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function obterHistoricoPedidos(usuarioId) {
  const db = await getDBConnection();
  try {
    return await db.getAllAsync('SELECT * FROM historico_pedidos WHERE usuario_id = ? ORDER BY id DESC;', usuarioId);
  } catch (error) {
    return [];
  }
}