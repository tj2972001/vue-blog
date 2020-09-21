require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const blogRouter = require('./router/blogRouter')
const userRouter = require('./router/userRouter')
const globalErrorHandler = require('./controllers/errorController')

const app = express()

app.use(cors({ origin: /example\.com$/, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  console.log('Our express application has been started')
  next()
})
mongoose
  .connect(process.env.DATABASE_REMOTE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('DB connection successful!'))
  .catch((e) => {
    console.log(e)
  })

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use('/blog', blogRouter)
app.use('/user', userRouter)
app.use(globalErrorHandler)

/** Exporting root **/
module.exports = {
  path: '/api/v1/',
  handler: app,
}
