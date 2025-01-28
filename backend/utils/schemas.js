const joi = require('joi')

const userSchema = joi.object({
  username: joi.string().email().max(50).required(),
  password: joi.string().pattern(new RegExp('[a-zA-Z0-9]{3,30}$')),
})

const menuItemSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
  category: joi.string().valid('Appetizers', 'Main Course', 'Desserts'),
  price: joi.number().required(),
  availability: joi.boolean(),
})

const orderSchema = joi.object({
  userId: joi
    .string()
    .required()
    .regex(/^[a-f\d]{24}$/i)
    .message('Invalid user ID format'),
  items: joi
    .array()
    .items(
      joi.object({
        menuItem: joi
          .string()
          .required()
          .regex(/^[a-f\d]{24}$/i)
          .message('Invalid menu item ID format'),
        quantity: joi.number().integer().min(1).default(1),
      })
    )
    .required()
    .min(1)
    .message('Items must contain at least one item'),
  status: joi.string().valid('Pending', 'Completed').default('Pending'),
})

module.exports = {
  userSchema,
  menuItemSchema,
  orderSchema,
}
