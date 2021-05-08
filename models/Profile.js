const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  favMovies: [String],
});

//load schema into "users" model
mongoose.model("profiles", profileSchema);
