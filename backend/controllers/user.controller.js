const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

async function register(req, res) {
  try {
    const { username } = req.body
    const user = await User.findOne({ username })

    console.dir(user)

    if (user) return res.status(400).json({ message: 'User already exists' })

    const newUser = await User.create(req.body)

    if (!newUser)
      return res.status(400).json({ message: 'user creation failed' })

    res.status(201).json({
      message: 'user created successfully',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) return res.status(404).json({ message: 'user is not signed up' })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      res.status(401).json({ message: 'Incorrect credentials' })

    res.status(200).json({
      message: 'user logged in successfully',
      token: await user.generateToken(),
    })
  } catch (error) {
    console.log('Login error ', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  register,
  login,
}
