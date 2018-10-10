const fs = require('fs')
const R = require('ramda')
const isImage = require('is-image')
const sharp = require('sharp')
const path = require('path')
const fullPath = __dirname;

const originalFolder = '../'
const outputFolderForTest = '../outputResizedImages'
const pathToFile = file => `${originalFolder}/${file}`
const pathToOutputFile = file => `${outputFolderForTest}/${file}`

const getExtname = file => path.extname(file)
const isSomeExtname = file => R.contains(getExtname(file), ['.svg', '.gif'])
fs.readdir(originalFolder, (error, files) => {
  console.error(`Files: ${error}`)
  files.forEach(async file => {
    if (isImage(file) && !isSomeExtname(file) ) {
      await sharp(pathToFile(file))
        .resize(null, 700)
        .toFile(pathToOutputFile(file))
        .catch(error => {
          console.error(`Resize: ${error}`)
        })
    } else {
      fs.copyFile(`${fullPath}/${pathToFile(file)}`, `${fullPath}/${pathToOutputFile(file)}`, err => {
        if (!err) {
          console.log('File copied!');
        } else {
          console.log(err);
        }
      })
    }
  })
})
