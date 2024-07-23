const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart by customer ID
const getCartByCustomerId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ customer: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add item to cart
const addItemToCart = async (req, res) => {
    try {
        const {  productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let cart = await Cart.findOne({ customer: req.user._id });

        if (!cart) {
            cart = new Cart({
                customer: req.user._id,
                items: [{ product: productId, quantity, price: product.price }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].price = product.price;
            } else {
                cart.items.push({ product: productId, quantity, price: product.price });
            }
        }

        cart.updatedAt = new Date();
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update item quantity in cart
const updateCartItemQuantity = async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            cart.updatedAt = new Date();
            await cart.save();
            res.json(cart);
        } else {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const customerId = req.user.id;

        const cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        cart.updatedAt = new Date();
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const customerId = req.user._id;

        const cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.items = [];
        cart.updatedAt = new Date();
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCartByCustomerId,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    clearCart
};
