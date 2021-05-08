const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
});

//create model class - load schema into "users" mongoose model
mongoose.model("users", userSchema);
