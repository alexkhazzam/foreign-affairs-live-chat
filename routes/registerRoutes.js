const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

router.get('/', (req, res, next) => {
  res.status(200).render('register', {});
});

router.post('/', async (req, res, next) => {
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName.trim();
  const email = req.body.email.trim();
  const username = req.body.username.trim();
  const password = req.body.password;

  const payload = req.body;

  if (firstName && lastName && email && username && password) {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((err) => {
      console.log(`${err}`.red);
      payload.errorMessage = 'Something went wrong.';
      res.status(200).render('register', payload);
    });

    if (!user) {
      const data = req.body;
      data.password = await bcrypt.hash(password, 10);
      User.create(data)
        .then((user) => {
          req.session.user = user;
          return res.redirect('/');
        })
        .catch((err) => {
          console.log(`${err}`.red);
          throw err;
        });
    } else {
      if (email == user.email) {
        payload.errorMessage = 'Email already in use.';
      } else {
        payload.errorMessage = 'Username already in use.';
      }
      res.status(200).render('register', payload);
    }
  } else {
    payload.errorMessage = 'Make sure each field has a valid value.';
    res.status(200).render('register', payload);
  }
});

module.exports = router;
