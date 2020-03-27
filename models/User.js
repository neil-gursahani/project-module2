const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const email = require('mongoose-type-email');

const userModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  city: {type: String, required: true}
});

const User = mongoose.model('user', userModel);

module.exports = User;