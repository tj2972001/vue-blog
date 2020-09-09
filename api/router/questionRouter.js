const express = require('express')
const questionController = require('./../controllers/questionController')
const router = express.Router({ mergeParams: true })
router.route('/').get(questionController.getQuestions)
router.route('/:id').get(questionController.getQuestion)
module.exports = router
