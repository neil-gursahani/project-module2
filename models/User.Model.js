const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");

const userModel = new Schema({
  username: { String, required: true },
  password: { String, required: true },
  firstName: { String, required: true },
  lastName: { String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  address: { String, required: true }
});

const User = mongoose.model("user", usersModel);

module.exports = User;