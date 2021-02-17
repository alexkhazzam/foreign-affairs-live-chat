const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const mongoose = require('./database');
const color = require('colors');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config({ path: dotenv.config.env });

app.use(
  session({
    secret: 'bbq chips',
    resave: true,
    saveUninitialized: false,
  })
);

const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');

const postsApiRoute = require('./routes/api/posts');

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/logout', logoutRoute);

app.use('/api/posts', postsApiRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: 'Home',
    userLoggedIn: req.session.user,
  };

  res.status(200).render('home', payload);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}`.bold);
});
