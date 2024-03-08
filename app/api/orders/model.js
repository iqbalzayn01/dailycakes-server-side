const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderDetailSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const orderSchema = Schema(
  {
    orderItems: [orderDetailSchema],
    total: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    customerID: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", orderSchema);
