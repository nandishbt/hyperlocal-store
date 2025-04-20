import express from "express";
const router = express.Router();
import {
  placeOrder,
  getOrder,
  cancelOrder,
} from "../controllers/order.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

// Route to get all orders
router.route("/placeorder").post(isLoggedIn, placeOrder);
router.route("/getorder").get(isLoggedIn, getOrder);
router.route("/cancelorder").delete(isLoggedIn, cancelOrder);

export default router;
