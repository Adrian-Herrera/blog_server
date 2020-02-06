module.exports = {
  isLoggedIn(req, res, next) {
    // console.log(req.isAuthenticated());
    // console.log(user);
    if (req.isAuthenticated()) {
      return next();
    }
    return res.send("No esta logueado");
  }
};
