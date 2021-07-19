var mongoose = require("mongoose");
var db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true
});

let transactionSeed = [
  {
    name:'Input',
    value: '23941',
    date: new Date(Date.now()),
  },
  {
    name:'Input',
    value: '234251',
    date: new Date(Date.now()),
  },
];

db.Transaction.deleteMany({})
  .then(() => db.Transaction.collection.insertMany(transactionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });