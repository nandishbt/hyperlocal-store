import Store from "../models/store.model.js";
import Product from "../models/product.model.js";
import apiResponse from "../utils/apiResponse.js";

const addProduct = async (req, res) => {
  try {
    const { name, price, quantity, store } = req.body;
    if (!name || !price || !quantity || !store) {
      return res
        .status(400)
        .json(
          new apiResponse(false, 400, "Please provide all required fields")
        );
    }

    const storefound = await Store.findOne({ name: store });

    if (!storefound) {
      return res
        .status(400)
        .json(new apiResponse(false, 400, "Store not found"));
    }

  

    const product = await Product.create({
      name,
      price,
      quantity,
      store: storefound._id,
    });
    return res
      .status(201)
      .json(
        new apiResponse(true, 201, "Product created successfully", product)
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new apiResponse(false, 500, "Server error"));
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length == 0) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "No products found"));
    }
    return res
      .status(200)
      .json(
        new apiResponse(true, 200, "Products retrieved successfully", products)
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new apiResponse(false, 500, "Server error"));
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res
        .status(400)
        .json(new apiResponse(false, 400, "Please provide product id"));
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "Product not found"));
    }
    const store = await Store.findById(product.store);
    if (!store) {
      return res
        .status(404)
        .json(new apiResponse(false, 404, "Store not found"));
    }

    return res
      .status(200)
      .json(
        new apiResponse(true, 200, "Product retrieved successfully", {
          product,
          store,
        })
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new apiResponse(false, 500, "Server error"));
  }
};

export { addProduct, getAllProducts, getOneProduct };

