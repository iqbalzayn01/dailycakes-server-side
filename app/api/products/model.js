const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    productName: {
      type: String,
      minLength: [3, "Panjang nama produk minimal 3 karakter"],
      maxLength: [45, "Panjang nama produk maksimal 45 karakter"],
      required: [true, "Nama produk harus diisi"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
