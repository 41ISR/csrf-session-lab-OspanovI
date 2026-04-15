const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const csrf = require('csrf');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3001;

// Подключаем базу
const db = new Database(path.join(__dirname, 'db', 'casino.db'));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // адрес фронтенда Vite
  credentials: true
}));

app.use(session({
  secret: 'super-secret-key-for-session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 день
    sameSite: 'lax'
  }
}));

// CSRF защита
const csrfProtection = csrf({});
app.get('/api/csrf-token', (req, res) => {
  const secret = req.session.csrfSecret;
  if (!secret) {
    req.session.csrfSecret = csrfProtection.secretSync();
  }
  const token = csrfProtection.create(req.session.csrfSecret);
  res.json({ csrfToken: token });
});

// Middleware проверки CSRF для защищённых POST
function csrfCheck(req, res, next) {
  const token = req.body.csrfToken;
  const secret = req.session.csrfSecret;
  if (!secret || !csrfProtection.verify(secret, token)) {
    return res.status(403).json({ error: 'Недействительный CSRF токен' });
  }
  next();
}

// Middleware проверки авторизации
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }
  next();
}

// Эндпоинт регистрации
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }
  if (password.length < 3) {
    return res.status(400).json({ error: 'Пароль должен быть не менее 3 символов' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(`
      INSERT INTO users (username, email, password, balance)
      VALUES (?, ?, ?, 1000)
    `);
    const result = stmt.run(username, email, hashedPassword);
    req.session.userId = result.lastInsertRowid;
    res.json({ success: true, balance: 1000, username });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({ error: 'Имя или email уже заняты' });
    }
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Эндпоинт входа
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) {
    return res.status(401).json({ error: 'Неверное имя или пароль' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Неверное имя или пароль' });
  }
  req.session.userId = user.id;
  res.json({ success: true, balance: user.balance, username: user.username });
});

// Проверка сессии
app.get('/api/auth/check', requireAuth, (req, res) => {
  const user = db.prepare('SELECT username, balance FROM users WHERE id = ?').get(req.session.userId);
  res.json({ username: user.username, balance: user.balance });
});

// Выход
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// Спин (защищён авторизацией и CSRF)
const SYMBOLS = ['📚', '✏️', '🧠', '🎓', '🔥', '💯', '❌'];
const PAYOUTS = {
  '💯💯💯': 100,
  '🎓🎓🎓': 50,
  '🔥🔥🔥': 25,
  '🧠🧠🧠': 15,
  '📚📚📚': 10,
  '✏️✏️✏️': 8,
  '❌❌❌': 0
};

app.post('/api/spin', requireAuth, csrfCheck, (req, res) => {
  const { bet } = req.body;
  if (![10, 50, 100].includes(bet)) {
    return res.status(400).json({ error: 'Недопустимая ставка' });
  }

  try {
    const user = db.prepare('SELECT balance FROM users WHERE id = ?').get(req.session.userId);
    if (!user || user.balance < bet) {
      return res.status(400).json({ error: 'Недостаточно баллов' });
    }

    // Генерация результата
    const resultSymbols = Array.from({ length: 3 }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    );
    const combo = resultSymbols.join('');
    const multiplier = PAYOUTS[combo] || 0;
    const winAmount = multiplier * bet;
    const newBalance = user.balance - bet + winAmount;

    db.prepare('UPDATE users SET balance = ? WHERE id = ?').run(newBalance, req.session.userId);

    res.json({
      symbols: resultSymbols,
      winAmount,
      isWin: winAmount > 0,
      newBalance
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Лидерборд
app.get('/api/leaderboard', requireAuth, (req, res) => {
  const users = db.prepare(`
    SELECT username, balance FROM users
    ORDER BY balance DESC
    LIMIT 10
  `).all();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Бэкенд запущен на http://localhost:${PORT}`);
});
