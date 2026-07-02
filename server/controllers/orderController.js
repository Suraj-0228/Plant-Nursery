const Order = require('../models/Order');
const Plant = require('../models/Plant');
const Tax = require('../models/Tax');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user, items, shippingAddress, billingAddress, paymentMethod } = req.body;

    // Recalculate the total amount on the server-side to prevent client-side manipulation
    let subtotal = 0;
    const plantUpdates = [];

    // Pass 1: Verify stock availability and recalculate subtotal
    for (const item of items) {
      const plant = await Plant.findById(item.plant);
      if (!plant) {
        return res.status(404).json({ success: false, error: `Plant with id ${item.plant} not found` });
      }
      if (plant.stock < item.quantity) {
        return res.status(400).json({ success: false, error: `Insufficient stock for plant "${plant.name}". Only ${plant.stock} units available.` });
      }
      plantUpdates.push({ plant, quantity: item.quantity });
      subtotal += plant.price * item.quantity;
    }

    // Pass 2: Deduct stock and save plants
    for (const update of plantUpdates) {
      update.plant.stock -= update.quantity;
      await update.plant.save();
    }

    // Fetch dynamic tax rate from database
    let taxRate = 5;
    const taxSetting = await Tax.findOne();
    if (taxSetting) {
      taxRate = taxSetting.rate;
    }
    const taxRateDecimal = taxRate / 100;

    const totalAmount = subtotal + (subtotal * taxRateDecimal);

    const order = new Order({
      user,
      items,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentStatus: 'Paid', // Mocking payment status
      orderStatus: 'Confirmed',
    });

    await order.save();
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all orders for a user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('items.plant');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    if (order.orderStatus === 'Cancelled') {
        return res.status(400).json({ success: false, error: 'Order is already cancelled' });
    }

    if (order.orderStatus === 'Delivered' || order.orderStatus === 'Shipped') {
        return res.status(400).json({ success: false, error: 'Cannot cancel an order that has been shipped or delivered' });
    }

    // Restore inventory stock levels
    for (const item of order.items) {
      const plant = await Plant.findById(item.plant);
      if (plant) {
        plant.stock += item.quantity;
        await plant.save();
      }
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'fullname email').populate('items.plant');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        if (order.orderStatus === 'Cancelled') {
            return res.status(400).json({ success: false, error: 'Cannot change the status of a cancelled order' });
        }

        if (req.body.orderStatus === 'Cancelled') {
            return res.status(400).json({ success: false, error: 'Admins cannot cancel customer orders' });
        }

        order.orderStatus = req.body.orderStatus;
        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
