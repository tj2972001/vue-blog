require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const blogRouter = require('./router/blogRouter')
const userRouter = require('./router/userRouter')
const imageRouter = require('./router/imageRouter')
const globalErrorHandler = require('./controllers/errorController')

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  console.log('request.cookies')
  console.log(JSON.stringify(req.cookies))
  next()
})

app.use((req, res, next) => {
  console.log('Our express application has been started')
  next()
})
mongoose
  .connect(process.env.DATABASE_LOCAL, {
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
app.use('/upload', imageRouter)
app.use(globalErrorHandler)

/** Exporting root **/
module.exports = {
  path: '/api/v1/',
  handler: app,
}
