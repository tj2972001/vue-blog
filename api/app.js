const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const cookieParser = require('cookie-parser')
const questionRouter = require('./router/questionRouter')
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
  })
  .then((con) => console.log('DB connection successful!'))
  .catch((e) => {
    console.log(e)
  })
if (process.env.NODE_ENV === 'development') {
  console.log('In dev')
  app.use(morgan('dev'))
}
app.use('/v1/questions', questionRouter)
module.exports = {
  path: '/api',
  handler: app,
}
