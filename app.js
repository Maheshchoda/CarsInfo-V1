const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      bcrypt                = require('bcryptjs'),
      ejsLint               = require('ejs-lint'),
      methodOverride        = require('method-override'),
      validator             = require('validator'),
      cookieSession         = require('cookie-session'),
      User                  = require('./models/user'),
      passportSetup         = require('./config/passport-setup'),
      keys                  = require('./config/keys');


// Connecting the database through m lab

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to mongodb');
});

// mongoose.connect('mongodb://localhost/cars');

//================----Midleware------==============
//cookie Session
//It will encrypt the cookie and make sures that it will lasts for day long
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey],
}));


//initialize passportSetup
app.use(passport.initialize());
app.use(passport.session());


// Express Session
app.use(require('express-session')({
  secret: 'This is really secret dont tell to anyone',
  resave: false,
  saveUninitialized: false,
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Importing the routes
const routeHome   = require('./routes/index');
const loginRoute  = require('./routes/login');

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(methodOverride('_method'));

app.use(function (req, res, next) {
  res.locals.User = req.user;
  next();
 });


app.set('view engine', 'ejs');

app.use(express.static('public'));

//Routes
app.use('/', routeHome);

app.use('/user', loginRoute);



// process.env.PORT, process.env.IP
const port = process.env.port || 2018;
app.listen(port, () => {
  console.log('Server is started at port no: ' + port);
});
