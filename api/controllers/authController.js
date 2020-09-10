// const crypto = require('crypto')
// const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const AppError = require('./../utils/appError')
const userModel = require('./../model/userModel')
const catchAsync = require('./../utils/catchAsync')
const sendEmail = require('./../utils/email')
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET + '', {
    // expiresIn: process.env.JWT_EXPIRES_IN + '',
  })
}

const createSendToken = (user, code, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    // expires: new Date(parseInt(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN)),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)
  user.password = undefined
  res.status(code).json({
    status: 'success',
    message: 'Successfully created token and send as cookie',
    token,
    data: {
      user,
    },
  })
}

exports.signUp = catchAsync(async (req, res) => {
  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })
  createSendToken(user, 200, res)
})

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  if (!email || !password) {
    // eslint-disable-next-line new-cap
    return next(new AppError('Please provide email and password', 400))
  }
  const user = await userModel.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    // eslint-disable-next-line new-cap
    return next(new AppError('Wrong email or password', 401))
  }

  createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }
  if (!token) {
    return next(
      // eslint-disable-next-line new-cap
      new AppError(
        'No token found. Please send token in order to get access the protected route',
        401
      )
    )
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET + '')

  const freshUser = await userModel.findById(decoded.id)
  if (!freshUser) {
    // eslint-disable-next-line new-cap
    return next(new AppError('No user found', 401))
  }
  req.user = freshUser
  next()
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email
  console.log('email is' + email)
  if (!email) {
    return next(new AppError('Please provide your email address', 400))
  }
  const user = await userModel.findOne({ email })
  if (!user) {
    return next(
      new AppError(
        'No account found with this email. Please provide correct email',
        404
      )
    )
  }
  console.log('user is ' + JSON.stringify(user))
  const resetToken = user.createResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`
  const message = `To reset password . click the link ${resetURL}. Valid for 10 minutes only`
  try {
    await sendEmail({
      email: user.email,
      subject: 'About reseting the password',
      message,
    })
    res.status(200).json({
      status: 'success',
      message: 'mail send to user successfully',
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(
      new AppError(
        'Error while sending email. Please try after some time.',
        500
      )
    )
  }
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not allowded to perform this action', 401)
      )
    }
    next()
  }
}

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ status: 'success' })
}
