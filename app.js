const Express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = Express();

app.use(
  session({
    secret: '...',
    resave: true,
    saveUninitialized: false,
  })
);

dotenv.config({ path: dotenv.config.env });

app.use(Express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const sessionMiddleware = require('./sessionMiddleware');

app.use(loginRoute);
app.use(registerRoute);

app.use('/', sessionMiddleware.validateSession, (req, res, next) => {
  const payload = {};
  res.status(200).render('home', {});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}`);
});
