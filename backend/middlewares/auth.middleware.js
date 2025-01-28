const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

async function isAuthenticated(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '').trim()

    const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findOne({ _id: isTokenVerified.userId })

    if (!user) throw new Error('please login')

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { isAuthenticated }
