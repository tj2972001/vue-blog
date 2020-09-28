const mongoose = require('mongoose')
const slugify = require('slugify')
const blogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      minlength: [50, 'Discription must be at-least 50 characters long'],
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    saveAsDraft: {
      type: Boolean,
      required: true,
    },
    categories: {
      type: [
        {
          type: String,
        },
      ],
      validate: {
        validator(val) {
          return val.length < 10
        },
        message: 'You can only add 10 categories with post',
      },
    },
    claps: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
    },
    isSecret: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

blogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})
blogSchema.pre(/^find/, function (next) {
  this.find({ isSecret: { $ne: true } })
  next()
})
blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name',
  })
  next()
})

const blogModel = mongoose.model('Blog', blogSchema)
module.exports = blogModel
