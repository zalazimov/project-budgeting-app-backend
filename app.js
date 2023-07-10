const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");

const app = express();

const controller = require("./controllers/controller");
// console.log(uuidv4().slice(0, 4));

app.use(cors());
app.use(express.json());
app.use("/transactions", controller);

app.get("/", (req, res) => {
  console.log("GET landing page");
  res.send("BudgetExpert");
});

app.get("*", (req, res) => {
  console.log("Cannot fulfill GET request");
  res.status(404).send("Sorry, this route does not exist! Please try again.");
});

module.exports = app;
