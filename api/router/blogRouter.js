const express = require('express')
const router = express.Router({ mergeParams: true })
const authController = require('./../controllers/authController')
const blogController = require('./../controllers/blogController')
// xdcfef
router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.createBlog
  )
router
  .route('/:slug')
  .get(blogController.getBlog)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.updateBlog
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.deleteBlog
  )
module.exports = router
