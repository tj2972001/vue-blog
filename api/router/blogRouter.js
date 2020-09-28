const express = require('express')
const router = express.Router({ mergeParams: true })
const authController = require('./../controllers/authController')
const blogController = require('./../controllers/blogController')

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

router
  .route('/article/:slug/clap')
  .patch(authController.protect, blogController.postClap)
router
  .route('/article/:slug/unClap')
  .patch(authController.protect, blogController.unPostClap)
router.route('/article/:slug/likes').get(blogController.getLikesListOnBlog)

module.exports = router
