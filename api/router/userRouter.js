const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.route('/login').post(authController.login)
router.route('/signup').post(authController.signUp)
router.route('/forgot-password').post(authController.forgotPassword)
// router.route('/reset-password/:token').post(authController.resetPassword)
router
  .route('/updatePassword')
  .patch(authController.protect, authController.updatePassword)
router.route('/logout').get(authController.protect, authController.logout)

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
  .patch(
    authController.protect,
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  )
router
  .route('/profile/delete')
  .patch(authController.protect, userController.deleteMe)
router.route('/profile/me').get(authController.protect, userController.getMe)

module.exports = router
