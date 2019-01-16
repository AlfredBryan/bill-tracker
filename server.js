const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
require("dotenv").config();

const billRouter = require("./app/routes/Bills");

const app = express();

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, autoIndex: false },
  () => {
    console.log("Connected to database");
  }
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", billRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server now listening @port ${port}`);
});
