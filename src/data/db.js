
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'feedback.db');

let db = null;

export async function getDbConnection() {
  if (db) {
    return db;
  }

  try {
    db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        feedback TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log(`Database connection established successfully at: ${DB_PATH}`);
    return db;

  } catch (error) {
    console.error('FATAL: Database initialization failed. Check package installs.', error);
    throw error;
  }
}