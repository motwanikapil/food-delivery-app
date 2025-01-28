const mongoose = require('mongoose')

const URI = process.env.MONGO_URI

async function connectDb() {
  try {
    await mongoose.connect(URI)
  } catch (error) {
    console.log('Database connection failed')
    console.error(error)
    process.exit(0)
  }
}

module.exports = connectDb
