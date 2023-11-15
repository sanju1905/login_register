// models/CurrencyRate.js

const mongoose = require("mongoose");

const people= new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: { type: String, required: true },
});

const People = mongoose.model("People", people);

module.exports = People;
