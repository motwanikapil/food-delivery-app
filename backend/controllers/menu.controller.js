const Menu = require('../models/menu.model')

const LIMIT = 10
const SKIP = 0

async function getAllMenuItems(req, res) {
  try {
    const { limit, skip } = req.query

    const menuItems = await Menu.find({})
      .limit(limit ?? LIMIT)
      .skip(skip ?? SKIP)
      .sort({ availability: -1 })

    if (!menuItems)
      return res.status(404).json({ message: 'menu items not found' })

    res.status(200).json({ menuItems, totalCount: await Menu.countDocuments() })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}
async function addMenuItem(req, res) {
  /*
    const { Schema, model } = require('mongoose')

    const menuSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        enum: ['Appetizers', 'Main Course', 'Desserts'],
        default: 'Appetizers',
      },
      price: {
        type: Number,
        required: true,
      },
      availability: {
        type: Boolean,
        default: true,
      },
    })

    module.exports = mongoose.model('Menu', menuSchema)
    */

  const { name, price } = req.body

  if (!name || !price)
    return res.status(400).json({ message: 'All fields are required' })

  const newMenuItem = await Menu.create(req.body)

  res.status(201).json({ message: 'menu item created successfully' })
}

async function updateMenuItem(req, res) {
  try {
    const { id: _id } = req.params
    const { name, category, price, availability } = req.body
    const menuItem = await Menu.findOne({ _id })

    if (!menuItem) return res.status(404).json({ message: 'item not found' })

    if (
      name === menuItem.name &&
      category === menuItem.category &&
      availability === menuItem.availability &&
      price === menuItem.price
    ) {
      return res.status(400).json({ message: 'no changes to update' })
    }

    const newMenuItem = await Menu.updateOne({ _id }, { $set: req.body })

    res.status(200).json({ message: 'menu item updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}

async function deleteMenuItem(req, res) {
  try {
    const { id: _id } = req.params

    const menuItem = await Menu.findOneAndDelete({ _id }, { $set: req.body })

    if (!menuItem)
      return res.status(400).json({ message: 'menu item deletion failed' })

    res.status(200).json({ message: 'menu item deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}

module.exports = {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
}
