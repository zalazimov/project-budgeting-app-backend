const express = require("express");
const router = express.Router();

let transactionsArray = require("../models/transactions");

// Reads all transactions
router.get("/", (req, res) => {
  console.log("GET all transactions");
  res.json(transactionsArray);
});

//  Reads single transaction by ID
router.get("/:id", (req, res) => {
  console.log("GET single transaction by id");
  const { id } = req.params;

  const match = transactionsArray.find((item) => item.id === id);

  if (!match) {
    res.redirect("/*");
  } else {
    res.json(match);
  }
});

// Adding a new transaction
router.post("/", (req, res) => {
  transactionsArray.push(req.body);
  res.status(200).json({
    status: true,
    message: "New transaction added!",
    data: transactionsArray[transactionsArray.length - 1],
  });
});

// Updating a current transaction
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const foundIndex = transactionsArray.findIndex(
    (item) => item.id === Number(id)
  );

  if (foundIndex === -1) {
    res.status(404).json({
      status: false,
      message: "Sorry, the ID you entered does not exist in our database",
    });
  } else {
    transactionsArray[foundIndex] = req.body;
    let foundItem = transactionsArray[foundIndex];
    res.status(200).json({
      status: true,
      message: "Successfully updated",
      data: foundItem,
    });
  }
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
