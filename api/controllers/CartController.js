const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { body, validationResult, param } = require('express-validator');

// Validation rules
const validateCart = (method) => {
    switch (method) {
        case 'addItemToCart':
            return [
                body('productId').not().isEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid Product ID'),
                body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
            ];
        case 'updateCartItemQuantity':
            return [
                body('customerId').not().isEmpty().withMessage('Customer ID is required').isMongoId().withMessage('Invalid Customer ID'),
                body('productId').not().isEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid Product ID'),
                body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
            ];
        case 'removeItemFromCart':
            return [
                body('productId').not().isEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid Product ID'),
            ];
        default:
            return [];
    }
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
};

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
const addItemToCart = [
    validateCart('addItemToCart'),
    validate,
    async (req, res) => {
        try {
            const { productId, quantity } = req.body;

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
            cart = await Cart.find({ _id: cart._id }).populate('items.product');
            res.status(201).json(cart);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
];

// Update item quantity in cart
const updateCartItemQuantity = [
    validateCart('updateCartItemQuantity'),
    validate,
    async (req, res) => {
        try {
            const { customerId, productId, quantity } = req.body;

            let cart = await Cart.findOne({ customer: customerId });
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }

            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                cart.updatedAt = new Date();
                await cart.save();
                cart = await Cart.find({ _id: cart._id }).populate('items.product');
                res.json(cart);
            } else {
                return res.status(404).json({ error: 'Product not found in cart' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
];

// Remove item from cart
const removeItemFromCart = [
    validateCart('removeItemFromCart'),
    validate,
    async (req, res) => {
        try {
            const { productId } = req.body;
            const customerId = req.user.id;

            let cart = await Cart.findOne({ customer: customerId });
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }

            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            cart.updatedAt = new Date();
            await cart.save();
            cart = await Cart.find({ _id: cart._id }).populate('items.product');
            res.json(cart);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
];

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
