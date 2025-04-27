const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema
const productSchema = new Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    grade: { type: String, required: true },
    description: String,
    specs: { type: Schema.Types.Mixed, default: {} },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    manufacturer: String,
    releaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
productSchema.index({ productId: 1 });

module.exports = mongoose.model("Product", productSchema, "products");
