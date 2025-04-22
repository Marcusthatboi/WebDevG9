const mongoose = require("mongoose");
const { Schema } = mongoose;
//table layout for the product data
const productSchema = new Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  grade: { type: String, required: true },
  description: String,
  specs: { type: Schema.Types.Mixed, default: {} },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  manufacturer: String,
  releaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
