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
exports.getAllBlogs = catchAsync(async (req, res, next) => {
  try {
    const features = new APIFeatures(blogModel.find({}), req)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .categories()
    const blogs = await features.query
    const totalBlogsCount = await blogModel.count({})
    let totalBlogs
    if (blogs) {
      totalBlogs = blogs.length
    } else {
      totalBlogs = 0
    }
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
      author: req.body.author,
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
exports.postClap = catchAsync(async (req, res, next) => {
  let post = await blogModel.findById(req.params.slug)
  if (!post) {
    return next(new AppError('No blog article found with that id', 404))
  }
  post = await blogModel.findByIdAndUpdate(
    req.params.slug,
    {
      $addToSet: { claps: req.user._id },
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json({
    status: 'success',
    message: 'You liked article',
    data: {
      post,
    },
  })
})
exports.unPostClap = catchAsync(async (req, res, next) => {
  let post = await blogModel.findById(req.params.slug)
  if (!post) {
    return next(new AppError('No blog article found with that id', 404))
  }
  post = await blogModel.findByIdAndUpdate(
    req.params.slug,
    {
      $pull: { claps: req.user._id },
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json({
    status: 'success',
    message: 'You Unliked article',
    data: {
      post,
    },
  })
})
exports.getLikesListOnBlog = catchAsync(async (req, res, next) => {
  try {
    const blog = await blogModel
      .findById(req.params.slug)
      .populate('claps', 'name photo')
      .select('claps')
    if (!blog) {
      return next(
        new AppError(`There were no likes on post ${req.params.slug}`, 404)
      )
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully fetched likes',
      data: {
        blog,
      },
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: `sorry ${e.message}`,
    })
  }
})
