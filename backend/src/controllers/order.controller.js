import apiResponse from "../utils/apiResponse.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";


const placeOrder = async (req, res) => {
  try {
    const { items, amountPaid, address, phone } = req.body;
    const user = req.user._id;
    const order = await Order.create({
      items,
      amountPaid,
      address,
      phone,
      orderedBy: user,
    });
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const updatedProducts = products.map((product) => {
      const orderedItem = items.find(
        (item) => item.product.toString() === product._id.toString()
      );
      if (orderedItem) {
        product.quantity = Number(product.quantity) -  Number(orderedItem.quantity);
        return product.save();
      }
    });
    await Promise.all(updatedProducts);

    return res
      .status(200)
      .json(new apiResponse(true, 200, "Order placed successfully", order));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new apiResponse(false, 500, "Internal server error", null));
  }
};

const getOrder = async (req, res) => {
  try {
    const user = req.user._id;
    const orders = await Order.find({ orderedBy: user })
      .populate("items.product", "name price")
      .populate("orderedBy", "fullname email")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json(new apiResponse(true, 200, "Orders fetched successfully", orders));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new apiResponse(false, 500, "Internal server error", null));
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const user = req.user._id;
    const order = await Order.findById(orderId)
    if (!order) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "Order not found", null));
    }
  
    const productIds = order.items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const updatedProducts = products.map((product) => {
      const orderedItem = order.items.find(
        (item) => item.product.toString() === product._id.toString()
      );
      if (orderedItem) {
        product.quantity =  Number(product.quantity) + Number(orderedItem.quantity);
        return product.save();
      }
    });
    await Promise.all(updatedProducts);
    await Order.findByIdAndDelete(orderId);
    return res
      .status(200)
      .json(new apiResponse(true, 200, "Order cancelled successfully", null));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new apiResponse(false, 500, "Internal server error", null));
  }
};

export { placeOrder, getOrder, cancelOrder };
