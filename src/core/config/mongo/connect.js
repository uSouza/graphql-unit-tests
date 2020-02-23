const mongoose = require('mongoose')

const { MONGO_URL, MONGO_DATABASE } = process.env

const URI = `${MONGO_URL}/${MONGO_DATABASE}`

module.exports = () => mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
