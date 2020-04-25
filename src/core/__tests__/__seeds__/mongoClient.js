const { MongoClient } = require('mongodb')

class MongoClientTests {
  constructor () {
    this.URI = process.env.MONGO_URL
    this.DATABASE = process.env.MONGO_TESTS_DATABASE
    this.connection = this.connect()
  }

  connect() {
    return MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: process.env.MONGO_DATABASE,
    })
  }

  async getDatabase() {
    return (await this.connection).db(this.DATABASE)
  }

  async close() {
    return (await this.connection).close()
  }
}

module.exports = new MongoClientTests()
