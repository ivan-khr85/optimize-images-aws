const fs = require('fs')
const { execSync } = require('child_process')

const pathToFolder = '../'
const s3bucket = 's3://...'

fs.readdir(pathToFolder, (error, files) => {
  console.error(`Files: ${error}`)
  for (let count = 0; count < files.length; count++) {
    try {
      execSync(
        `aws s3 cp ../outputResizedImages/${files[count]} ${s3bucket}${
          files[count]
        }`
      )
      console.log(
        `${new Date().getHours()}: ${new Date().getMinutes()}: ${new Date().getSeconds()} -- count file: ${count}`
      )
    } catch (error) {
      console.log(error)
    }
  }
})
