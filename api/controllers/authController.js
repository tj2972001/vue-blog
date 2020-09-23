// const crypto = require('crypto')
// const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const AppError = require('./../utils/appError')
const userModel = require('./../model/userModel')
const catchAsync = require('./../utils/catchAsync')
const sendEmail = require('./../utils/email')
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (user, code, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
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
  await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })
  // createSendToken(user, 200, res)
  res.status(200).json({
    status: 'success',
    message: 'Your account has been successfully created. You can login now',
  })
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
  console.log('req.cookies')
  console.log(JSON.stringify(req.cookies))
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

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   /// /1. get token from req.params.token
//   /// /2. hash it and compare it with one from db
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex')
//   const user = await userModel.findOne({
//     passwordResetExpires: { $gt: Date.now() },
//     passwordResetToken: hashedToken,
//   })
//   if (!user) {
//     return next(new AppError('Cant found user with that token'), 404)
//   }
//   user.password = req.body.password
//   user.passwordConfirm = req.body.passwordConfirm
//   user.passwordResetToken = undefined
//   user.passwordResetExpires = undefined
//   await user.save()
//   // createSendToken(user, 200, res)
//   res.status(200).json({
//     status: 'success',
//     message:
//       'Password Updated Successfully And Logged You Out. Now login again',
//   })
// })

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select('+password')
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401))
  }
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()
  res.status(200).json({
    status: 'success',
    message: 'Successfully changed password',
  })
  // createSendToken(user, 200, res);
})

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedouthahahhahahhahhaha', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ status: 'success' })
}
