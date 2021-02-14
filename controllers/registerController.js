const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');

module.exports.getRegisterPage = (req, res, next) => {
  res.status(200).render('register', {
    uniqueEmail: req.query.uniqueEmail === 'fail' ? false : true,
    fullFields: req.query.fullFields === 'fail' ? false : true,
    studentEmail: req.query.studentEmail === 'fail' ? false : true,
    passwordNumber: req.query.passwordNumber === 'fail' ? false : true,
    length: req.query.length === 'fail' ? false : true,
  });
};

module.exports.postRegisterPage = async (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const passwordConf = req.body.passwordConf.trim();

  if (email && password && passwordConf) {
    if (email.split('@')[1] !== 'student.gn.k12.ny.us') {
      res.redirect('/register/?studentEmail=fail');
    }

    if (password.length < 8) {
      res.redirect('/login/?length=fail');
    }

    let chars = 0;
    for (let i = 0; i < password.length; i++) {
      isNaN(password[i]) ? chars++ : null;
      chars === password.length
        ? res.redirect('/login/?passwordNumber=fail')
        : null;
    }

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
          res.status(200).redirect('/');
        })
        .catch((err) => {
          console.log(`${err}`.red);
          throw err;
        });
    }
    res.redirect('/register/?uniqueEmail=fail');
  }
  res.redirect('/register/?fullFields=fail');
};
