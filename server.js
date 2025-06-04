// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session setup (cookie‐based)
app.use(
  session({
    secret: 'askhr-assistant-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }, // 30 minutes
  })
);

// Serve everything in /public as static
app.use(express.static(path.join(__dirname, 'public')));

// Load users from users.json
const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8'));

// --- ROUTES ---

// Root: if logged in, serve index.html; else redirect to /login
app.get('/', (req, res) => {
  if (req.session.username) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  return res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// GET /login: always show login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// POST /login: process credentials
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const found = users.find((u) => u.username === username && u.password === password);

  if (found) {
    req.session.username = username;
    return res.redirect('/');
  } else {
    // Invalid credentials: show a simple message or redirect back
    return res.send(
      `<h3>Invalid credentials. <a href="/login">Try again</a></h3>`
    );
  }
});

// GET /logout: destroy session
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// POST /ask: chatbot endpoint
app.post('/ask', (req, res) => {
  if (!req.session.username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userMessage = req.body.query;
  // → For now, return a dummy reply. You can swap this for Copilot/OpenAI/FAQ logic.
  const botReply = `You said: "${userMessage}". How can I help further?`;

  return res.json({ answer: botReply });
});

// Catch-all: if user tries to hit any other route while not logged in, redirect to /login
app.use((req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`AskHR Assistant running on http://localhost:${PORT}`);
});