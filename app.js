const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      Login          = require('./models/login'),
      bcrypt         = require('bcryptjs'),
      ejsLint        = require('ejs-lint'),
      methodOverride = require('method-override'),
      validator      = require('validator');

mongoose.connect('mongodb://ChodaLight:14345612am@ds255930.mlab.com:55930/cars');
// mongoose.connect('mongodb://localhost/cars');
const routeHome   = require('./routes/index');
const loginRoute  = require('./routes/login');

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(methodOverride('_method'));




app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', routeHome);

app.use('/login', loginRoute);



// process.env.PORT, process.env.IP

app.listen(2018, function (req, res) {
  console.log('Server is started');
});
