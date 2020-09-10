const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    dateCreated: {
      type: Date,
      // required: true,
    },
    saveAsDraft: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: [
        {
          type: String,
          ref: 'Category',
        },
      ],
      validate: [arrayLimit, 'Categories exceeds the limit of 10'],
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
function arrayLimit(val) {
  return val.length <= 10
}
const blogModel = mongoose.model('Blog', blogSchema)
module.exports = blogModel
