const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'askhrhubsecret',
  resave: false,
  saveUninitialized: true
}));

// Load users
let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    res.sendFile(__dirname + '/public/login.html');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const validUser = users.find(user => user.username === username && user.password === password);

  if (validUser) {
    req.session.user = username;
    res.redirect('/');
  } else {
    res.send('Invalid credentials. <a href="/">Try again</a>');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.post('/chat', (req, res) => {
  const msg = req.body.message;
  res.json({ reply: `You said: "${msg}". How can I help you further?` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});