const express = require("express");
const Bill = require("../models/Bills");

const router = express.Router();

router.get("/bills", (req, res) => {
  Bill.find({}, (err, bills) => {
    if (err) res.status(404).send(err);
    res.status(200).send(bills);
  }).limit(6);
});

router.post("/bills/add", (req, res) => {
  Bill.create(
    {
      billFor: req.body.billFor,
      amount: req.body.amount
    },
    (err, bill) => {
      if (err) res.status(500).send(err.message);
      res.status(201).send(bill);
    }
  );
});

router.put("/bills/update/:id", (req, res) => {
  Bill.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, bill) => {
    if (err) res.status(404).send(err.message);
    res.status(201).send(bill);
  });
});

router.delete("/bills/remove/:id", (req, res) => {
  Bill.findByIdAndDelete(req.params.id, err => {
    if (err) res.status(500).send(err.message);
    res.status(201).send("Bill Removed");
  });
});

module.exports = router;
