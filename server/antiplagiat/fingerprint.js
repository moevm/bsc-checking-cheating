const { crc32 } = require('crc')
const jsRegExp = require('../language/javascript')
const tokenization = require('./tokenization')

const splitOnKGrams = (code, t) => {
  const array = []
  for (let i = 0; i < code.length - t; i++) {
    const value = code.slice(i, i + t)
    const hash = crc32(value).toString(16)

    array.push(hash)
  }
  return array
}

const winnowKGrams = (kGrams, t, k) => {
  const w = t - k + 1
  const result = []
  let prevMin = null

  for (let i = 0; i < kGrams.length - w + 1; i++) {
    let localMin = null

    for (let j = i; j < i + w; j++) {
      if (localMin === null || kGrams[j] < localMin.value) {
        localMin = { value: kGrams[j] }
      } else if (kGrams[j] === localMin.value) {
        localMin.isRepeat = true
      }
    }

    if (prevMin === null || localMin.value !== prevMin.value || localMin.isRepeat) {
      prevMin = localMin
      result.push(localMin)
    }
  }

  return result.map(item => item.value)
}

module.exports = function (code) {
  const tokenizedCode = tokenization.transform(code, 'java')
  const k = 3
  const t = 5

  const kGrams = splitOnKGrams(tokenizedCode, t)
  const winnowedKGrams = winnowKGrams(kGrams, t, k)

  return winnowedKGrams
}
