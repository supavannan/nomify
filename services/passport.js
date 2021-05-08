const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//create model class from user model
const User = mongoose.model("users");

//"user" record from mongo passed in
passport.serializeUser((user, done) => {
  //user id refers to RECORD ID generated in mongo (not googleID)
  done(null, user.id);
});

//id is the user.id passed from serializeUser via the done function
passport.deserializeUser((id, done) => {
  //"user" record is passed from database
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      //check if User exists in database already
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        //pass null since no error
        done(null, existingUser);
      } else {
        //make a new record (User model instance) with this new unique googleID
        const user = await new User({
          googleID: profile.id,
        }).save();
        done(null, user);
      }
    }
  )
);
