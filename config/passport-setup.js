const passport        = require('passport');
const GoogleStrategy  = require('passport-google-oauth20');
const keys            = require('./keys');
const User            = require('../models/user');


passport.serializeUser((user, done) => {
  //we are getting the done function with newUser or currentUser and
  //serialize with the help of user.id(which will give you _id)
  //and we dont want to send normal id, so we will encrypt using the cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //when the user requests something we will find the id and
  //deserialize it
  User.findById(id).then((user) => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  //options for the google start
  callbackURL: '/user/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
}, (acessToken, refreshToken, profile, done) => {
  //=======passport callback function=======
  //Find wheter the user is already in the database
  User.findOne({ googleId: profile.id }).then((currentUser) => {
    if (currentUser) {
      //If he is a existing user
      console.log(currentUser + 'He is the currentUser');
      //we are calling the done function with currentUser
      done(null, currentUser);
    }else {
      //If he is a new user
      new User({
        username: profile.displayName,
        googleId: profile.id,
      }).save().then((newUser) => {
        console.log('New user created:' + newUser);
        //we are calling the done function with newUser
        done(null, newUser);
      });
    }
  });
})
);
