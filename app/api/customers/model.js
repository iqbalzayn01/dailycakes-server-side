const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let customerSchema = Schema(
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
      required: [true, "Password harus diisi"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  const Customer = this;
  if (Customer.isModified("password")) {
    Customer.password = await bcrypt.hash(Customer.password, 12);
  }
  next();
});

customerSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = model("Customer", categorySchema);
