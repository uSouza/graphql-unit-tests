const fs = require('fs')
const path = require('path')

module.exports = (type) => {
  return new Promise((resolve, reject) => {
    const pathToSchema = path.join(
      process.cwd(),
      `./src/${type}/domain/schema/${type}.gql`
    )
    fs.readFile(pathToSchema, { encoding: 'utf-8' }, (err, schema) => {
      if (err) return reject(err)
      resolve(schema)
    })
  })
}
