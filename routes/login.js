const express = require('express');
const router  = express.Router();



router.get('/', function (req, res) {
  res.render('login');
});

router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var newlogin = {
    username: username,
    password: password,
  };
  Login.create(newlogin, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.redirect('/');
    }
  });
});



module.exports = router;
