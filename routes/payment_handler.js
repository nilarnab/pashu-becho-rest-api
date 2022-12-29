const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
require('dotenv').config();
const router= express.Router();
const app = express();
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.APIKEY,
  key_secret: process.env.SECRETKEY,
});



router.post("/createOrder", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount,
      currency: "INR",
    });
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

router.post("/verifySignature", (req, res) => {
  const { orderID, transaction } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.SECRETKEY)
    .update(`${orderID}|${transaction.razorpay_payment_id}`)
    .digest("hex");

  res.send({ validSignature: generatedSignature === transaction.razorpay_signature });
});
module.exports=router;