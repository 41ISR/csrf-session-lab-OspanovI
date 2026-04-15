const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'casino.db');
const db = new Database(dbPath);

// Создаём таблицу пользователей
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    balance INTEGER DEFAULT 1000
  )
`);

// Создаём демо-пользователя, если таблица пуста
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (userCount === 0) {
  const hashedPassword = bcrypt.hashSync('123456', 10);
  db.prepare(`
    INSERT INTO users (username, email, password, balance)
    VALUES (?, ?, ?, ?)
  `).run('student', 'student@example.com', hashedPassword, 1000);
}

console.log('База данных инициализирована');
db.close();
