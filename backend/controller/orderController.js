import Order from "../model/OrderModel.js";
import User from "../model/userModel.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const currency = "inr";
var RazorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//for user
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} }); //jaise hi cart placed hoga cart empty ho jayega
    return res.status(201).json({ msg: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Order Placed error" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "userOrder error" });
  }
};

//for admin
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(500).json({ msg: "adminAllorders" + error });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ msg: "status updated" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await RazorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log("razorpay error1");
        return res.status(500).json(error);
      }
      res.status(200).json(order);
    });
  } catch (error) {
    console.log("razorpay error2");
    res.status(500).json({ msg: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id } = req.body;
    const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ msg: "payment successful" });
    } else {
      res.json({ msg: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
