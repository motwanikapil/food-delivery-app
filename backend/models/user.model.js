const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    next()
  }

  try {
    const saltRound = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, saltRound)
    user.password = hashPassword
  } catch (error) {
    next(error)
  }
})

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        username: this.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7d',
      }
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = model('User', userSchema)
