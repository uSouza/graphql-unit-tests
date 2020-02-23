const apolloServer = require('./core/config/apollo/apolloServer')
const mongoConnect = require('./core/config/mongo/connect')

module.exports = async () => {
  try {
    await mongoConnect()
    const server = await apolloServer()    
    server.listen(process.env.PORT, '0.0.0.0').then(() => {
      console.log('\x1b[36m%s\x1b[0m', `SERVERINIT: 👍  GraphQL API ready at http://${process.env.VIRTUAL_HOST}:${process.env.PORT} 👍`)
    })
  } catch (error) {
    console.error('SERVERINIT ERROR', error)
  }
}
