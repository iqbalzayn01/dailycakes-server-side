const mongoose = require("mongoose");

const customerRefreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CustomerRefreshToken",
  customerRefreshTokenSchema
);
