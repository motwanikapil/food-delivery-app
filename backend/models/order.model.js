const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true,
  },
  quantity: { type: Number, required: true },
})

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    // {
    //   menuItem: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Menu',
    //   },
    //   quantity: {
    //     type: Number,
    //     default: 1,
    //   },
    // },
    orderItemSchema,
  ],
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Order', orderSchema)
