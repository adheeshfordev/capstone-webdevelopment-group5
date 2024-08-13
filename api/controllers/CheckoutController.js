const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {processImageUrl} = require('../utils/firebase') 

const checkout = async (req, res) => {
  try {
    const customerId = req.user.id; // Assuming you have user info in the request (after authentication)
    const cart = await Cart.findOne({ customer: customerId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let total = 0;
    cart.items.forEach(item => {
      total += item.quantity * item.product.price;
    });

    const order = new Order({
      customer: customerId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        imageUrl: processImageUrl(item.product.imageUrl)
      })),
      total,
    });

    await order.save();

    // Clear the cart after successful order creation
    await Cart.findOneAndUpdate({ customer: customerId }, { items: [] });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  checkout,
};
