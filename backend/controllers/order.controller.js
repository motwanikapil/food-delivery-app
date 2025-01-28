const Order = require('../models/order.model')
const Menu = require('../models/menu.model')

const LIMIT = 10
const SKIP = 0

async function getAllOrders(req, res) {
  try {
    const { limit, skip } = req.query

    const orders = await Order.find({})
      .populate({
        path: 'items.menuItem', // Populate menuItemId for each item in the items array
        model: 'Menu',
      })
      .limit(limit ?? LIMIT)
      .skip(skip ?? SKIP)

    if (orders.length === 0) {
      return res.status(404).json({ message: 'orders not found' })
    }

    res.status(200).json({ orders })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}

async function newOrder(req, res) {
  try {
    const items = req.body.items // Expecting an array of items

    // Verify if all menuItemIds exist in the Menu collection
    const menuItems = await Menu.find({
      _id: { $in: items.map((item) => item.menuItem) },
    })
    if (menuItems.length !== items.length) {
      return res
        .status(400)
        .json({ message: 'one or more menu items not found' })
    }

    const newOrder = await Order.create(req.body)

    if (!newOrder) {
      return res.status(400).json({ message: 'order creation failed' })
    }

    // Populate the menu item details in the response
    const populatedOrder = await Order.findById(newOrder._id).populate({
      path: 'items.menuItem',
      model: 'Menu',
    })

    res.status(200).json({
      message: 'order created successfully',
      order: populatedOrder,
    })
  } catch (error) {
    console.error(error)
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'validation error', error: error.message })
    }
    return res.status(500).json({ message: 'internal server error' })
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params

    const order = await Order.findById(id).populate('menuItem')

    if (!order) {
      return res.status(404).json({ message: 'order not found' })
    }

    res.status(200).json({ order })
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'invalid order id' })
    }
    return res.status(500).json({ message: 'internal server error' })
  }
}

module.exports = {
  getAllOrders,
  newOrder,
  getOrderById,
}
