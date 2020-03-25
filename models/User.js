const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const userModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
    // required: true
  },
  address: {
    city: String,
    street: String,
    houseNumber: Number
    // required: true
  }
});

const User = mongoose.model('user', userModel);

module.exports = User;