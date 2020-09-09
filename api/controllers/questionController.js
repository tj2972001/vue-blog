exports.getQuestions = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Hello from getQuestions',
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `errr`,
    })
  }
}
exports.getQuestion = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Hello from getQuestion',
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `error`,
    })
  }
}
