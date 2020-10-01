const cloudinary = require('cloudinary').v2
const sharp = require('sharp')
const multer = require('multer')
import path from 'path'
const DatauriParser = require('datauri/parser')

const catchAsync = require('./../utils/catchAsync')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

exports.uploadBlogPhoto = upload.single('photo')

exports.resizeBlogPhoto = catchAsync(async (req, res, next) => {
  try {
    if (!req.file) return next()
    const dUri = new DatauriParser()
    const dataUri = (req) =>
      dUri.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
      )
    const file = dataUri(req).content
    const image = await cloudinary.uploader.upload(file, {
      transformation: [{ width: 300, crop: 'pad', quality: 40 }],
    })
    return res.status(200).json({
      status: 'success',
      data: {
        image,
      },
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    })
  }
})
