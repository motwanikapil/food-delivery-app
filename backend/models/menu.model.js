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

module.exports = model('Menu', menuSchema)
