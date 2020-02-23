const dependencyInjection = require('../../middleware/dependencyInjection')

module.exports = async (req) => {
  const ctx = await dependencyInjection()

  return { ...ctx }
}
