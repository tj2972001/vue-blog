const nodemailer = require('nodemailer')
const sendEmail = async (options) => {
  /// / 1. Create a Transporter
  console.log(require('dotenv').config())

  console.log('email username')
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  /// / 2.define the email options
  const mailOptions = {
    from: 'TEJAS JADHAV <tj2972001@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  /// /3.Actually send the email
  try {
    transporter.sendMail(mailOptions)
  } catch (e) {
    console.log(e)
  }
}
module.exports = sendEmail
