const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
});

//load schema into "users" model
mongoose.model("users", userSchema);
