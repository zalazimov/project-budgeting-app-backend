const { v4: uuidv4 } = require("uuid");

// id: uuidv4().slice(0, 3);

module.exports = [
  {
    id: 123,
    item_name: "income",
    amount: 350000,
    date: "April 1, 2023",
    from: "Google",
    category: "income",
  },
  {
    id: 456,
    item_name: "mortage",
    amount: 1000,
    date: "June 2, 2023",
    from: "bank",
    category: "income",
  },
  {
    id: 789,
    item_name: "stocks",
    amount: 100000,
    date: "July 4, 2023",
    from: "Amazon",
    category: "investment",
  },
];
