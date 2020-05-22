const { crc32 } = require('crc')
const jsRegExp = require('../regex/javascript')

const splitOnKGrams = (code, t) => {
  const array = []
  for (let i = 0; i < code.length - t; i++) {
    const value =  code.slice(i, i + t)
    const hash = crc32(value)

    // array.push({
    //   value,
    //   hash: crc32(value)
    // })
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

    const winnows = []
    for (let j = i; j < i + w; j++) {
      if (localMin === null || kGrams[j] < localMin.value) {
        localMin = { value: kGrams[j] }
      } else if (kGrams[j] === localMin.value) {
        localMin.isRepeat = true
      }
      winnows.push(kGrams[j])
    }
    // console.log(winnows)

    if (prevMin === null || localMin.value !== prevMin.value || localMin.isRepeat) {
      prevMin = localMin
      result.push(localMin)
    }
  }

  return result.map(item => item.value)
}


module.exports = function(code) {
  const spaceRegExp = '\\s'
  const commentRegExp = '\\/\\/(\\s|[а-яA-Я:;]|w)*\\n'
  const regExp = new RegExp(`${commentRegExp}|${jsRegExp}|${spaceRegExp}`, 'g')
  // console.log(regExp)

  const tokenizedCode = code.replace(regExp, '')
  const k = 2
  const t = 10

  const kGrams = splitOnKGrams(tokenizedCode, t)
  console.log('k-grams hashes count: ', kGrams.length)

  // const unique = kGrams.reduce((result, item) => {
  //   if (!result.find(res => res.hash === item.hash)) {
  //     result.push(item)
  //   }
  //   return result
  // }, [])
  const winnowedKGrams = winnowKGrams(kGrams, t, k)
  console.log('winnowed hashes: ', winnowedKGrams.length)

  return winnowedKGrams
}
