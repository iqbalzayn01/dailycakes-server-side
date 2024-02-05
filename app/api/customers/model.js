const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "Panjang nama customer minimal 3 karakter"],
      maxLength: [40, "Panjang nama customer maksimal 40 karakter"],
      required: [true, "Nama customer harus diisi"],
    },
    email: {
      type: String,
      minLength: [3, "Panjang email minimal 3 karakter"],
      maxLength: [30, "Panjang email maksimal 30 karakter"],
      required: [true, "Email harus diisi"],
    },
    password: {
      type: String,
      minLength: [3, "Panjang email minimal 3 karakter"],
      maxLength: [30, "Panjang email maksimal 30 karakter"],
      required: [true, "Email harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = model("Customer", categorySchema);
