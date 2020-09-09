require('dotenv').config({ path: './config.env' })
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const blogRouter = require('./router/blogRouter')
const userRouter = require('./router/userRouter')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  console.log('Our express application has been started')
  next()
})
mongoose
  .connect('mongodb://localhost:27017/test', {
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
  console.log('In dev')
  app.use(morgan('dev'))
}
app.use('/blog', blogRouter)
app.use('/user', userRouter)

/** Exporting root **/
module.exports = {
  path: '/api/v1/',
  handler: app,
}
