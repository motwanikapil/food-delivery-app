const router = require('express').Router()
const orderController = require('../controllers/order.controller')
const { isAuthenticated } = require('../middlewares/auth.middleware')
const validateMiddleware = require('../middlewares/validate.middleware')
const { orderSchema } = require('../utils/schemas')

router.post(
  '/order',
  isAuthenticated,
  validateMiddleware(orderSchema),
  orderController.newOrder
)
router.get('/orders', isAuthenticated, orderController.getAllOrders)

module.exports = router
