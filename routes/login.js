 const express  = require('express');
const passport = require('passport');
const router   = express.Router();
const User     = require('../models/user');




// route for Login
router.get('/login', (req, res) => {
  res.render('Users/login');
});

router.post('/login', passport.authenticate('local',
{
  successRedirect: '/',
  failureRedirect: '/user/login',
}), (req, res) => {

});

//Route for SignUp

router.get('/signup', (req, res) => {
  res.render('Users/signup');
});


router.post('/signup', (req, res) => {
  const newUser = ({
    username: req.body.username,
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render('Users/signup');
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

//Route for signing into the app with the Thrid parties with the help of OAuth

router.get('/auth/google', passport.authenticate('google', {
  //scope defines that what we want to retrieve from the Us ers
  scope: ['profile'],
}));

// callback route for google to redirect to

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

router.get('/auth/facebook', (req, res) => {
  res.send('You authenticated with the Facebook');
});


// Route for the loging out the user

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
