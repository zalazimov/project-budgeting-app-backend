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
  res.status(200).json({
    status: true,
    message: "New transaction added!",
    data: transactionsArray[transactionsArray.length - 1],
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params; // Access id from req.params

  const foundIndex = transactionsArray.findIndex(
    (item) => item.id === Number(id)
  );

  if (foundIndex === -1) {
    res.status(404).json({
      status: false,
      message: "Sorry, the ID you entered does not exist in our database", // Corrected error message
    });
  } else {
    let foundItem = transactionsArray[foundIndex];
    transactionsArray[foundIndex] = req.body; // Update the item in transactionsArray
    res.status(200).json({
      status: true,
      message: "Successfully updated",
      data: foundItem,
    });
  }
});
// // Update an existing transaction
// router.put("/:id", (req, res) => {
//   const { id } = req.body;
//   const foundIndex = transactionsArray.findIndex(
//     (item) => item.id === Number(id)
//   );

//   if (foundIndex === -1) {
//     res.status(404).json({
//       status: false,
//       message: "Sorry, the ID you entered does exist in our database",
//     });
//   } else {
//     let foundItem = transactionsArray[foundIndex];
//     transactionsArray.splice(foundIndex, 1, req.body);
//     res.status(200).json({
//       status: true,
//       message: "Successfully updated",
//       data: foundItem,
//     });
//   }
// });

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
