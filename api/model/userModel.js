const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have name'],
      maxlength: [30, 'Name too big. You can enter your nickname'],
      minlength: [3, 'name too small. Enter full name'],
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'User must have email'],
      required: [true, 'A user must have email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Account must have password'],
      minlength: [8, 'Password should atleast 8 characters long'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Account must have passwordConfirm'],
      validate: {
        validator(el) {
          return el === this.password
        },
        message: 'Password must match to passwordConfirm',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    accountCreatedAt: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    lastEdited: Date,
    photo: {
      type: String,
      default: 'v.png',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
})
userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.accountCreatedAt = Date.now()
  }
  if (!this.isModified('password') || this.isNew) {
    return next()
  }
  this.passwordChangedAt = Date.now()
  next()
})
userSchema.pre(/^find/, function (next) {
  // TODO: DOUGHT
  this.find({ active: { $ne: false } })
  next()
})
userSchema.pre(/Update$/, function (next) {
  this.lastEdited = Date.now()
  next()
})
userSchema.methods.correctPassword = async (
  userTypedPassword,
  databasePassword
) => {
  return await bcrypt.compare(userTypedPassword, databasePassword)
}
userSchema.methods.createResetPasswordToken = function (next) {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  // HACK: token will expire after 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  // HACK: We store encrypted reset token to our database but sends normal token to user
  return resetToken
}

const userModel = mongoose.model('User', userSchema)
module.exports = userModel
