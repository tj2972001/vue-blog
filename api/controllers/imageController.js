const cloudinary = require('cloudinary').v2
const sharp = require('sharp')
const uniqid = require('uniqid')
const catchAsync = require('./../utils/catchAsync')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.blogImage = catchAsync(async (req, res, next) => {
  try {
    const unique = uniqid()
    const str = `uploads/blog/${unique}.jpeg`
    await sharp(req.files.photo.data)
      .toFormat('jpeg')
      .resize({
        height: 300,
        width: 300,
        fit: 'contain',
      })
      .toFile(str)
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
