const router = require('express').Router()
const menuController = require('../controllers/menu.controller')

const validateMiddleware = require('../middlewares/validate.middleware')
const { isAuthenticated } = require('../middlewares/auth.middleware')
const { menuItemSchema } = require('../utils/schemas')

router
  .route('/menu')
  .get(menuController.getAllMenuItems)
  .post(
    isAuthenticated,
    validateMiddleware(menuItemSchema),
    menuController.addMenuItem
  )

router
  .route('/menu/:id')
  .put(isAuthenticated, menuController.updateMenuItem)
  .delete(isAuthenticated, menuController.deleteMenuItem)

module.exports = router
