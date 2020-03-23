const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: String,
    capital: String,
    region: String,
    subregion: String,
    population: Number,
    area: Number,
    borders: Array,
    demonym: String, 
    currencies: Array,
    languages: Array,
    flag: String
  });

module.exports = countryModel;