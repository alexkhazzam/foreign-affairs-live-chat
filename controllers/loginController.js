const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');

module.exports.getLoginPage = (req, res, next) => {
  res.render('login', {});
};

module.exports.postLoginPage = async (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  if (email && password) {
    const user = await User.findOne({ email: email }).catch((err) => {
      console.log(`${err}`.red);
      res.status(200).redirect('/login');
    });

    if (user) {
      const passwordsMatch = await bcrypt
        .compare(password, user.password)
        .catch((err) => {
          console.log(`${err}`.red);
          res.status(200).redirect('/login');
        });

      if (passwordsMatch) {
        req.session.user = user;
        return res.status(200).redirect('/');
      }
    }
    return res.status(200).redirect('/login');
  }
  res.status(200).redirect('/login');
};
