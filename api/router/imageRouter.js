const express = require('express')
const imageController = require('./../controllers/imageController')
const authController = require('./../controllers/authController')
const router = express.Router()

router
  .route('/blog')
  .post(
    imageController.uploadBlogPhoto,
    imageController.resizeBlogPhoto,
    imageController.blogImage
  )

module.exports = router
