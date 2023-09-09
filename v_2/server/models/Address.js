const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    postcode: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    addr1: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    addr2: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    landmark: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    userId: {
      type: ObjectId,
    },
    saveAddress: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
