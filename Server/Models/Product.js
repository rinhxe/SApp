const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  product_name: String,
  product_price: Number,
  product_image: String,
});


module.exports = mongoose.models.Product || mongoose.model('product', schema);