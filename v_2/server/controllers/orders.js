const Painting = require("../models/PaintingSchema");
const Address = require("../models/Address");
const { Order } = require("../models/Order");
const Razorpay = require("razorpay");
const { request } = require("express");

exports.placeorder = async (req, res, next) => {
  const {
    email,
    fullName,
    address,
    paymentMode,
    saveAddress,
    products,
    userId,
    total,
    phone,
  } = req.body;

  const prodIdArr = products.map((prod) => ({
    id: prod._id,
    quantity: prod.quantity,
  }));
  try {
    const tempAddress = new Address({
      postcode: address.pincode,
      addr1: address.address1,
      addr2: address.address2,
      landmark: address.landmark,
      userId,
      saveAddress,
    }).save();

    try {
      const order = await new Order({
        products: prodIdArr,
        address: tempAddress._id,
        userId,
        total,
        email,
        fullName,
        phone,
        paymentStatus: paymentMode === "online_pay" ? false : true,
      }).save();

      if (!order) {
        return res
          .status(400)
          .send({ err: "Something went wrong please try after some time" });
      }
      if (order) {
        if (paymentMode === "online_pay") {
          req.totalAmount = total;
          req.orderId = order.orderId;
          req.orderIdOrder = order._id;
          next();
          return;
        }

        return res.send({ msg: "Order placed successfully" });
      }
    } catch (error) {
      return res.status(400).send({
        err: "Something went wrong while placing order pls try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      err: "Please check address again",
    });
  }
};

// Orders checking middleware
exports.checkOrder = async (req, res, next) => {
  let { products } = req.body;
  let orderHasError = false;

  for (let idx = 0; idx < products.length; idx++) {
    const product = products[idx];
    try {
      const paintingData = await Painting.findById(product._id).exec();
      if (!paintingData) {
        orderHasError = true;
        products[idx].productError =
          "Unable to find the product - please try removing it";
      }

      if (product.quantity > paintingData.stock) {
        orderHasError = true;
        products[idx].productError =
          "Quantity not in stock - please try removing it";
      }
      try {
        const updatedPainting = await Painting.findByIdAndUpdate(
          product._id,
          {
            $set: {
              sold: paintingData.sold + product.quantity,
              stock: paintingData.stock - product.quantity,
            },
          },
          { new: true }
        );
        if (!updatedPainting) {
          orderHasError = true;
          products[idx].productError =
            "Unable to place order - try removing it";
        }
      } catch (error) {}
    } catch (error) {
      console.log(error);
      orderHasError = true;
      products[idx].productError =
        "Something wrong with the product - please try removing it";
    }
  }

  if (orderHasError) {
    return res.status(400).send({
      err: "Some of your order items in list are having issues",
      products,
    });
  }
  next();
};

exports.razorpayCreateOrder = async (req, res) => {
  const { totalAmount, orderId, orderIdOrder } = req;

  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRECT,
  });
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: orderId,
  };
  try {
    const myOrder = await instance.orders.create(options);
    return res.status(200).send({
      info: "RazorPay payment created successfully",
      myOrder,
      orderIdOrder,
    });
  } catch (error) {
    return res.status(400).send({
      err: "Someting wrong with payment portal please try after sometime",
    });
  }
};

exports.captureRzrPyPayment = (req, res) => {
  Order.findByIdAndUpdate(req.body.orderId, {
    $set: { paymentStatus: true },
  }).exec();
  return res.send({ msg: "Order placed successfully" });
};

exports.userOrders = (req, res) => {
  Order.find({ userId: req.params.userId }).then((data) => {
    if (!data) return res.send({ err: "No orders found" });
    return res.send(data);
  });
};
exports.orderDetails = (req, res) => {
  if (!req.params.orderId) return res.send({ err: "OrderId not found" });
  Order.findById(req.params.orderId)
    .populate({
      path: "products.id",
    })
    .then((data) => {
      if (!data) return res.send({ err: "Order Details Not found" });

      return res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
