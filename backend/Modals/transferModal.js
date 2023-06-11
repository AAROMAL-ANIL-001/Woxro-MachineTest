const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
  },
});

module.exports = mongoose.model("transferUser", transferSchema);
