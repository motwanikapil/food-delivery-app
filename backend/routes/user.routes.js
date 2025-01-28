const router = require('express').Router()
const userController = require('../controllers/user.controller')
const validateMiddleware = require('../middlewares/validate.middleware')
const { userSchema } = require('../utils/schemas')

router.post(
  '/register',
  validateMiddleware(userSchema),
  userController.register
)
router.post('/login', validateMiddleware(userSchema), userController.login)

module.exports = router
