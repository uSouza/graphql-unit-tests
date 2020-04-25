const mongoose = require('mongoose')

const { MONGO_URL, MONGO_DATABASE, MONGO_TESTS_DATABASE } = process.env

class MongoConfig {
  constructor (isIntegrationTestsConn = false) {
    this.URI = `${MONGO_URL}/${!isIntegrationTestsConn ? MONGO_DATABASE : MONGO_TESTS_DATABASE}`
    this.connect()
  }

  async connect () {
    await mongoose.connect(this.URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    return
  }

  async close() {
    await mongoose.connection.close()
    return
  }
}

module.exports = (isIntegrationTestsConn) => new MongoConfig(isIntegrationTestsConn)
