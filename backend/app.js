require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const menuRoutes = require('./routes/menu.routes')
const userRoutes = require('./routes/user.routes')
const orderRoutes = require('./routes/order.routes')
const connectDb = require('./utils/db')
const errorMiddlware = require('./middlewares/error.middleware')

const { PORT, FRONTEND_URL } = process.env

app.use(helmet())
app.use(
  cors({
    origin: FRONTEND_URL,
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRoutes, orderRoutes, menuRoutes)
app.use(errorMiddlware)

connectDb()
  .then((res) => {
    console.log('database connected successfully')
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('database connection failed')
    console.error(err)
  })
