const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');

module.exports.getRegisterPage = (req, res, next) => {
  res.status(200).render('register', {
    uniqueEmail: req.query.uniqueEmail === 'fail' ? false : true,
    fullFields: req.query.fullFields === 'fail' ? false : true,
  });
};

module.exports.postRegisterPage = async (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const passwordConf = req.body.passwordConf.trim();

  if (email && password && passwordConf) {
    const user = await User.findOne({ email: email }).catch((err) => {
      console.log(`${err}`.red);
      throw err;
    });

    if (!user) {
      const newUser = { ...req.body };
      delete newUser.passwordConf;

      newUser.password = await bcrypt.hash(password, 10).catch((err) => {
        console.log(`${err}`.red);
        throw err;
      });

      return User.create(newUser)
        .then((user) => {
          req.session.user = user;
          console.log(user);
          return res.status(200).redirect('/');
        })
        .catch((err) => {
          console.log(`${err}`.red);
          throw err;
        });
    }
    return res.redirect('/register/?uniqueEmail=fail');
  }
  res.redirect('/register/?fullFields=fail');
};
