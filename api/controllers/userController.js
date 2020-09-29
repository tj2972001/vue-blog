const multer = require('multer')
const sharp = require('sharp')

const catchAsync = require('./../utils/catchAsync')
const APIFeatures = require('./../utils/APIFeatures')
const AppError = require('./../utils/appError')

const userModel = require('./../model/userModel')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(userModel.find({}), req)
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

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

exports.uploadUserPhoto = upload.single('photo')

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next()

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${req.file.filename}`)

  next()
})

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log('req.body', req.body)
  console.log('req.file', req.file)
  let user = await userModel.findById(req.user._id)
  if (!user) {
    return next(new AppError('No user exist', 404))
  }
  const filterBody = filterObj(req.body, 'name', 'email')
  if (req.file) filterBody.photo = req.file.filename
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
