const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let customerSchema = Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname harus diisi"],
      minlength: 3,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: [true, "Lastname harus diisi"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email harus diisi"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      minlength: 6,
    },
    address: {
      type: String,
      required: [true, "Address harus diisi"],
      minlength: 20,
    },
    notelp: {
      type: String,
      required: [true, "Nomor Telpon harus diisi"],
      maxlength: 15,
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
