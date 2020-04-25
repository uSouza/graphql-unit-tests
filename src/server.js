require('./core/config/mongo')()
const apolloServer = require('./core/config/apollo/apolloServer')

module.exports = async () => {
  try {
    const server = await apolloServer()
    await server.listen(process.env.PORT, '0.0.0.0')
    console.log('\x1b[36m%s\x1b[0m', `SERVERINIT: 👍 GraphQL API ready at http://${process.env.VIRTUAL_HOST}:${process.env.PORT} 👍`)
  } catch (error) {
    console.error('SERVERINIT ERROR', error)
  }
}
