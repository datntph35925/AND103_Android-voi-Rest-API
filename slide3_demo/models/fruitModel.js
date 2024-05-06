const mongoose = require("mongoose");
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: String,
  },
  origin: {
    type: String,
  },
});
const fruit = mongoose.model("fruit", fruitSchema);
module.exports = fruit;
