const path = require('path')
const fs = require('fs')

const { findFingerprint } = require('../antiplagiat')

const directoryPath = path.join(__dirname, 'code')

const codes = []

fs.readdir(directoryPath, function (err, subDirs) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  subDirs.forEach(function (subDir) {
    const filePath = path.join(directoryPath, subDir, 'main.java')

    try {
      const file = fs.readFileSync(filePath)

      if (file) {
        console.log(subDir)
        codes.push({
          name: subDir.replace('-', '|').padEnd(30, '-').padStart(33, ' '),
          fingerprint: findFingerprint(file.toString())
        })
      }
    } catch (error) {
      console.log(error)
    }
  })

  const original = codes[0]
  codes.slice(1).forEach(code => {
    console.log(code.name, findSimilarity(original.fingerprint.slice(), code.fingerprint))
  })
})

const findSimilarity = (original, fingerprint) => {
  let result = 0

  fingerprint.forEach(hash => {
    for (let i = 0; i < original.length; i++) {
      if (hash === original[i]) {
        original[i] = -1
        result += 1
        break
      }
    }
  })

  return (((fingerprint.length - result) / fingerprint.length) * 100).toFixed(1).padStart(4, ' ')
}
