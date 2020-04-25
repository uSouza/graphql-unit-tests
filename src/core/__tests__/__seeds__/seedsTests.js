const usersMock = require('./mocks/user.mock')

class SeedsTests {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  async start() {
    await this.userModel.insertMany(usersMock)
  }

  async destroy() {
    await this.userModel.deleteMany({})
  }
}

module.exports = (ctx) => new SeedsTests(ctx)
