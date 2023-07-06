const express = require("express");
const router = express.Router();

let transactionsArray = require("../models/transactions");

// Gets all transactions
router.get("/", (req, res) => {
  res.json(transactionsArray);
});

// Get / Reads transaction by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const match = transactionsArray.find((item) => item.id === Number(id));

  if (!match) {
    res.redirect("/*");
  } else {
    res.json(match);
  }
});

// Adding a new transaction
router.post("/", (req, res) => {
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1]);
});

module.exports = router;
