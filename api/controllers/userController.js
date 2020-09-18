const catchAsync = require('./../utils/catchAsync')
const APIFeatures = require('./../utils/APIFeatures')
const AppError = require('./../utils/appError')

const userModel = require('./../model/userModel')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(userModel.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const users = await features.query
  if (!users) {
    return next(new AppError('No users found', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  })
})
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found', 404))
  }
  await user.remove()
  res.status(200).json({
    status: 'success',
    data: null,
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  let user = await userModel.findById(req.user._id)
  if (!user) {
    return next(new AppError('User doesnt exist'))
  }
  user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      active: false,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})
exports.updateMe = catchAsync(async (req, res, next) => {
  let user = await userModel.findById(req.user._id)
  if (!user) {
    return next(new AppError('No user exist', 404))
  }
  const filterBody = filterObj(req.body, 'name', 'email')
  user = await userModel.findByIdAndUpdate(req.user._id, filterBody, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user._id)
  if (!user) {
    return next(new AppError('Sorry No user found', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})
const filterObj = (obj, ...allowdedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowdedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}
