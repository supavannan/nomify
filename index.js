const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

//importing mongoDB models
require("./models/User");
//require("./models/Profile");

//must require passport AFTER requiring User model
require("./services/passport");

//pass mongo uri to connect to our mongo database
mongoose.connect(keys.mongoURI);

//express app declaration
const app = express();

//30 day expiration for session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//authRoutes returns the route handlers with app passed in
require("./routes/authRoutes")(app);

//if heroku pushes env variables, otherwise use 5000 (dev)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
