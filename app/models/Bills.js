const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billSchema = Schema(
  {
    billFor: {
      type: String,
      required: [true, "Enter bill type"]
    },
    amount: {
      type: Number,
      required: [true, "Enter Amount"]
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
