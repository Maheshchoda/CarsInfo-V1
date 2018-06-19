const express   = require('express');
const router    = express.Router();
const Cars      = require('../models/cars');
const User     = require('../models/user');
const authCheck = require('../config/authCheck');


//Middleware function to check whether user is loged in or not
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/login');
};

router.get('/', function (req, res) {
  Cars.find({ }, function (err, allCars) {
    if (err) {
      console.log(err);
    } else {
      res.render('Cars/home', {
        Cars: allCars,
        User: req.user,
      });
    }
  });
});


router.get('/new', isLoggedIn, authCheck, function (req, res) {
  res.render('Cars/carform');
});

router.post('/', function (req, res) {
  const carName   = req.body.carName;
  const carPrice  = req.body.carPrice;
  const img       = req.body.img;
  const info      = req.body.info;
  const newCar    = {
    carName: carName,
    carPrice: carPrice,
    img: img,
    info: info,
  };
  Cars.create(newCar, function (err, carDetails) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/:id', function (req, res) {
  Cars.findById(req.params.id, function (err, foundCar) {
    if (err) {
      console.log(err);
    } else {
      res.render('Cars/info', {
        Cars: foundCar,
      });
    }
  });
});

router.get('/:id/edit', isLoggedIn, authCheck, function (req, res) {
  Cars.findById(req.params.id, function (err, update) {
    if (err) {
      console.log(err);
      res.send('There is something wrong we will updtae it soon');
    }else {
      console.log(update);
      res.render('Cars/editCar', { Cars: update });
    }
  });

});

router.put('/:id', function (req, res) {
  const carName   = req.body.carName,
       carPrice  = req.body.carPrice,
       img       = req.body.img,
       info      = req.body.info;
   const  updateCar = {
    carName: carName,
    carPrice: carPrice,
    img: img,
    info: info,
   };
    Cars.findByIdAndUpdate(req.params.id, updateCar, function (err, carUpdated) {
      if (err) {
        console.log(err);
        res.send('<h1>Something gone wrong we will back soon</h1>');
      } else {
        res.redirect('/' + req.params.id);
      }
    });
  });

router.get('/:id/delete', isLoggedIn, authCheck, function (req, res) {
  Cars.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
