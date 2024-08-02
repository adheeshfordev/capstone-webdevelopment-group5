const Order = require('../models/Order');

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('items.product');
    res.header("Content-Range", `orders 0-${orders.length - 1}/${orders.length}`);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  listOrders,
};
