import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';
import apiResponse from '../utils/apiResponse.js';

const addToCart = async(req, res) =>{
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; 

       

        // Check if the product exists in the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json(new apiResponse(false, 404, 'Product not found'));
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex > -1) {
            // Update the quantity of the existing item
            cart.items[existingItemIndex].quantity = Number(cart.items[existingItemIndex].quantity) + Number(quantity);
        } else {
            // Add a new item to the cart
            cart.items.push({ product: productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json(cart);
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json(new apiResponse(false, 500, 'Internal server error'));
        
    }
}


const updateCart = async(req, res) =>{
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; // Assuming you have user ID from authentication middleware

        // Check if the user has a cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json(new apiResponse(false, 404, 'Cart not found'));
        }

        // Check if the product is in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex === -1) {
            return res.status(404).json(new apiResponse(false, 404, 'Product not found in cart'));
        }

        // Update the quantity of the existing item
        cart.items[existingItemIndex].quantity = quantity;

        // Save the updated cart
        await cart.save();

        res.status(200).json(cart);
        
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json(new apiResponse(false, 500, 'Internal server error'));
        
    }
}

const getCart = async(req, res) =>{
    try {
        const userId = req.user._id; 



        // Check if the user has a cart
        const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price'); // Populate product details
        if (!cart) {
            return res.status(404).json(new apiResponse(false, 404, 'Cart not found'));
        }

        res.status(200).json(new apiResponse(true, 200, "cart found",cart));


        
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

const removeFromCart = async(req, res) =>{
    try {
        const { productId } = req.body;
        const userId = req.user._id; 

        // Check if the user has a cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json(new apiResponse(false, 404, 'Cart not found'));
        }

        // Check if the product is in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex === -1) {
            return res.status(404).json(new apiResponse(false, 404, 'Product not found in cart'));
        }

        // Remove the item from the cart
        cart.items.splice(existingItemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json(new apiResponse(true, 200, 'Product removed from cart', cart));
        
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json(new apiResponse(false, 500, 'Internal server error'));
        
    }
}


export {
    addToCart,
    updateCart,
    removeFromCart,
    getCart
}