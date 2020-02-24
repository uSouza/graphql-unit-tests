const dependencyInjection = require('../../middleware/dependencyInjection')

module.exports = async (req) => {
  const ctx = await dependencyInjection()
  const token = req.headers.authorization
  const user = token ? await ctx.jwtService.verify(token) : null
  return { ...ctx, user }
}
