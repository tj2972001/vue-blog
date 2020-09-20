const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      minlength: [50, 'Discription must be atleast 50 characters long'],
    },
    title: {
      type: String,
      required: true,
      unique: true,
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
          ref: 'Category',
        },
      ],
      validate: [arrayLimit, 'Categories exceeds the limit of 10'],
    },
    claps: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
      validate: [arrayLimit, 'Claps exceeds the limit of 10'],
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
