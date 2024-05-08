const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  serialNumber: String,
  name: String,
  brand: String,
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
