const blogModel = require('./../model/blogModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const APIFeatures = require('./../utils/APIFeatures')
const filterObj = (obj, ...allowdedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowdedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}
exports.getAllBlogs = catchAsync(async (req, res) => {
  try {
    const features = new APIFeatures(blogModel.find({}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .categories()
    const blogs = await features.query
    const totalBlogsCount = await blogModel.count({})
    const totalBlogs = blogs.length
    res.status(200).json({
      status: 'success',
      totalBlogsCount,
      totalBlogs,
      data: {
        blogs,
      },
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: `${e.message}`,
    })
  }
})
exports.createBlog = catchAsync(async (req, res) => {
  try {
    const blog = await blogModel.create({
      title: req.body.title,
      categories: req.body.categories,
      saveAsDraft: req.body.saveAsDraft,
      content: req.body.content,
      discription: req.body.discription,
      dateCreated: req.body.dateCreated,
    })
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e.message,
    })
  }
})
exports.getBlog = catchAsync(async (req, res, next) => {
  try {
    const blog = await blogModel.findById(req.params.slug)
    if (!blog) {
      return next(new AppError('Cant find the article you requested', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    })
  }
})
exports.updateBlog = catchAsync(async (req, res, next) => {
  try {
    const filterBody = filterObj(req.body, 'content', 'title', 'categories')
    let blog = await blogModel.findById(req.params.slug)
    if (!blog) {
      return next(new AppError('Cant find the article you requested', 404))
    }
    blog = await blogModel.findByIdAndUpdate(req.params.slug, filterBody, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    })
  }
})
exports.deleteBlog = catchAsync(async (req, res, next) => {
  try {
    const blog = await blogModel.findById(req.params.slug)
    if (!blog) {
      return next(new AppError('Cant find the article you requested', 404))
    }
    blog.remove()
    res.status(200).json({
      status: 'success',
      data: null,
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    })
  }
})
