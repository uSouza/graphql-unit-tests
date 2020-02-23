module.exports = (error) => {
  console.log('\x1b[31m%s\x1b[0m', `ERROR: Server: ${JSON.stringify(error)}`)
  const errorlog = {
    "message": error.message,
    "code": error.extensions.code,
  }
  return errorlog
}
