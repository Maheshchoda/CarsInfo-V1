
const authCheck = (req, res, next) => {
  if (!req.user) {
    //if User is not logged in
    res.redirect('/user/login');
  }else {
    //If logged in
    next();
  }
};

module.exports = authCheck;
