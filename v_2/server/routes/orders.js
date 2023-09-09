const express = require("express");
const {
  placeorder,
  checkOrder,
  razorpayCreateOrder,
  captureRzrPyPayment,
  userOrders,
  orderDetails,
} = require("../controllers/orders");
const router = express.Router();

router.post("/placeorder", checkOrder, placeorder, razorpayCreateOrder);

router.post("/capture/razropayPayment", captureRzrPyPayment);

router.get("/allOrders/:userId", userOrders);
router.get("/getOrder/:orderId", orderDetails);

module.exports = router;
