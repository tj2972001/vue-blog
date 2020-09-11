const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.route('/login').post(authController.login)
router.route('/signup').post(authController.signUp)
router.route('/forgot-password').post(authController.forgotPassword)
router.route('/reset-password/:token').post(authController.resetPassword)

router.route('/all').get(userController.getAllUsers)
router
  .route('/:id')
  .get(userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  )
router
  .route('/profile/update')
  .patch(authController.protect, userController.updateMe)
router
  .route('/profile/delete')
  .patch(authController.protect, userController.deleteMe)

module.exports = router
