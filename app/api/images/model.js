const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const imageSchema = Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Image", imageSchema);
