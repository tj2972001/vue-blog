const cloudinary = require('cloudinary').v2
const sharp = require('sharp')
const multer = require('multer')
const uniqid = require('uniqid')

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
  console.log('IN RESIZE BLOG IMAGE')
  if (!req.file) return next()

  req.file.filename = `blog-${uniqid()}.jpeg`

  await sharp(req.file.buffer)
    .resize(500, 500, {
      fit: 'contain',
    })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/blog/${req.file.filename}`)

  next()
})

exports.blogImage = catchAsync(async (req, res, next) => {
  try {
    const str = `uploads/blog/${req.file.filename}`
    const image = await cloudinary.uploader.upload(str)
    return res.status(200).json({
      status: 'success',
      data: {
        image,
      },
    })
  } catch (e) {
    return res.status(400).json({
      status: 'fail',
      message: e.message,
    })
  }
})
