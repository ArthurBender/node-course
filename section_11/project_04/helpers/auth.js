function checkAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    req.flash('error', 'You must be logged in to view this page.');
    req.session.save(() => {
      res.redirect('/login');
    });
  }
}

module.exports = checkAuth;