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

// Deleting a transaction by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  let foundIndex = transactionsArray.findIndex(
    (item) => item.id === Number(id)
  );

  if (foundIndex === -1) {
    res.status(404).json({
      status: false,
      message: "Sorry, the ID you entered does exist in our database",
    });
  } else {
    let itemToDelete = transactionsArray[foundIndex];
    transactionsArray.splice(foundIndex, 1);
    res.status(200).json({
      status: true,
      message: "Transaction successfully deleted",
      data: itemToDelete,
    });
  }
});

module.exports = router;
