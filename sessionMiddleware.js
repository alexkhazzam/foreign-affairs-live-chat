module.exports.validateSession = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log('returning next');
    return next();
  } else {
    console.log('redirecting to login');
    return res.redirect('/login');
  }
};
