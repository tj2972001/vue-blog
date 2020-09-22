require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const blogRouter = require('./router/blogRouter')
const userRouter = require('./router/userRouter')
const globalErrorHandler = require('./controllers/errorController')

const app = express()
app.enable('trust proxy')
app.use(cors())
app.options('*', cors())
app.use(helmet())
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
//   - The following errors were reported by the server:
//
//   Domain: tejasjadhav2907.xyz
// Type:   unauthorized
// Detail: Invalid response from
// http://tejasjadhav2907.xyz/.well-known/acme-challenge/cCqy9CoaSWrpQKnz4in8QLRBCJ8VkSfx_iC96i2udP4
//   [2.57.90.16]: "<!DOCTYPE html>\n<html>\n\n<head>\n    <title>Parked
// Domain name on Hostinger DNS system</title>\n    <meta
// charset=\"utf-8\">\n    <met"
//
// To fix these errors, please make sure that your domain name was
// entered correctly and the DNS A/AAAA record(s) for that domain
// contain(s) the right IP address.
// - Your account credentials have been saved in your Certbot
// configuration directory at /etc/letsencrypt. You should make a
// secure backup of this folder now. This configuration directory will
// also contain certificates and private keys obtained by Certbot so
// making regular backups of this folder is ideal.
