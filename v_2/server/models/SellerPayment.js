const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sellerPaymentSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
    },
    ifscCode: {
      type: String,
      trim: true,
    },
    userId: {
      type: ObjectId,
    },
    myAmount: {
      type: Number,
      default: 0,
    },
    accountName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SellerPayment", sellerPaymentSchema);
