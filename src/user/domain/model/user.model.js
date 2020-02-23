const mongoose = require('mongoose')

const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    deleted: Boolean,
    deletedAt: Date,
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', user)
