const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const app = express();

const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000); // 24 hours

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate,
    sameSite: 'lax' // or 'strict' or 'none'
  }
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000);