const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");

const userModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  address: {
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number,
    // required: true
  }
});

const User = mongoose.model("user", userModel);

module.exports = User;