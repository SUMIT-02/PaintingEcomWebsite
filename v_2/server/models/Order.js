// Main Order schema. - for holding the order detials {items - populate the item details,address,payment,orderId,userId,total}
// Seller order Schema - with the current order {orderId,item(single) - populate the item details,address,paymentMode,total}

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const SellerOrderSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Painting",
  },
  orderId: {
    type: String,
  },
});

const SellerOrder = mongoose.model("SellerOrder", SellerOrderSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        id: {
          type: ObjectId,
          ref: "Painting",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    address: {
      type: ObjectId,
      ref: "Address",
    },
    userId: ObjectId,
    orderId: {
      type: String,
      default: `#-${uuidv4()}`,
    },
    total: {
      type: Number,
    },
    email: {
      type: String,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, SellerOrder };
