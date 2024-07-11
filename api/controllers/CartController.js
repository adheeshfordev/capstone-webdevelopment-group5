const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// Create a new cart for a customer
const createCart = async (req, res) => {
    try {
        const customerId = req.body.customer;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const cart = new Cart({ customer: customerId, items: [] });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add an item to the cart
const addToCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.product.toString() === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, price: product.price });
        }

        cart.updatedAt = Date.now();
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        cart.items.splice(itemIndex, 1);
        cart.updatedAt = Date.now();
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a cart item (e.g., change quantity)
const updateCartItem = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const { productId, quantity } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.product.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        cartItem.quantity = quantity;
        cart.updatedAt = Date.now();
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createCart, addToCart, removeFromCart, updateCartItem };
