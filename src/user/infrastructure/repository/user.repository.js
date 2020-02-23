const { Types } = require('mongoose')

module.exports = class UserRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  create (data) {
    return this.userModel.create(data)
  }

  update (id, data) {
    return this.userModel.findOneAndUpdate({
      $and: [
        { _id: Types.ObjectId(id) },
        {
          $or: [
            { deleted: { $exists: false } },
            { deleted: false },
          ],
        },
      ],
    }, data)
    .then(() => this.findOneById(id))
  }

  remove (id) {
    const data = { deleted: true, deletedAt: new Date() }
    return this.userModel.findOneAndUpdate(
      { _id: Types.ObjectId(id) },
      data
    ).then(() => true)
  }

  findOneById (id) {
    return this.userModel.findOne({
      $and: [
        { _id: Types.ObjectId(id) },
        {
          $or: [
            { deleted: { $exists: false } },
            { deleted: false },
          ],
        },
      ],
    })
  }

  findAll (skip, limit) {
    return this.userModel.find({
      $or: [
        { deleted: { $exists: false } },
        { deleted: false },
      ],
    })
    .skip(skip)
    .limit(limit)
  }
}