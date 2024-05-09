const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const app = express();

const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000); // 24 hours

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'www.mathpoint.academy', // use your actual domain
    expires: expiryDate,
    sameSite: 'lax' // or 'strict' or 'none'
  }
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000);