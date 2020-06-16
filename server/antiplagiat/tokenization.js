const path = require('path')
const fs = require('fs')

class Tokenization {
  languages = null
  language = null

  constructor() {
   this.languages = this.getLanguages()
  }

  getLanguages = () => {
    const directoryPath = path.join(__dirname, '../language')
  
    const dir = fs.readdirSync(directoryPath)

    const result = dir.reduce((result, fileName) => {
      const filePath = path.join(directoryPath, fileName)
      const file = fs.readFileSync(filePath)

      if (/\.json$/.test(fileName)) {
        const name = fileName.replace(/\.json/, '')
        const language = JSON.parse(file.toString())

        result[name] = language
        result.exts.push(language.extenstion)
      }
      return result
    }, { exts: [] })

    return result
  }

  transform = (code, lang) => {     
    if (lang && this.languages) {
      this.language = this.languages[lang]

      let result = this.removeComments(code, this.language.singleLineComment, '\\n', true)
      result = this.removeComments(result, this.language.multiLineCommentStart, this.language.multiLineCommentEnd)
      // console.log(result)
      result = this.splitByOperadns(result, this.language.operands)
      // console.log(result)
      result = this.normalizeWhiteSpaces(result)
      // console.log(result)
      result = this.replaceNumbers(result)
      // console.log(result)
      result = this.replaceKeywords(result, this.language.keywords)
      // console.log(result)
      result = this.replaceVariables(result, this.language.operands, this.language.keywords)
      console.log(result)
      return result
    }
  }

  removeComments = (code, start, end, isSingle) => {
    const commentRegExpStr = `${start}${isSingle ? '.*' : '[\\s\\S]*?'}${end}`
    const commentRegExp = new RegExp(commentRegExpStr, 'g')

    return code.replace(commentRegExp, '')
  }

  splitByOperadns = (code, operands) => {
    const specialSymbol = /\\|\/|\||\*|\+|\$|\.|\?|\(|\)|\[|\]|\^/
    const newOperands = operands.map(operand => {
      if (specialSymbol.test(operand)) {
        return `\\${operand}`
      }
      return operand
    })
    const operandsRegExp = new RegExp(newOperands.join('|'), 'g')
    const result = []
    let substr = code

    while (true) {
      const index = substr.search(operandsRegExp)
      
      if (index === -1) {
        break
      }

      result.push(substr.slice(0, index))
      result.push(substr[index])
      substr = substr.slice(index + 1, substr.length)
    }
    
    return result
  }

  normalizeWhiteSpaces = codeArray => {
    return codeArray.map(str => str.split(/\s+/).filter(str => str !== '')).flat()
  }

  replaceNumbers = codeArray => {
    const result = codeArray.map(str => {
      if (!isNaN(Number(str))) {
        return 'N'
      }
      return str
    })
    return result
  }

  replaceKeywords = (codeArray, keywords) => {
    const keywordsRegExp = new RegExp(`^(?:${keywords.join('|')})$`, 'g')

    const result = codeArray.map(str => {
      if (str.search(keywordsRegExp) !== -1) {
        return 'K'
      }
      return str
    })
    return result
  }

  replaceVariables = (codeArray, operands, keywords) => {
    const specialSymbol = /\\|\/|\||\*|\+|\$|\.|\?|\(|\)|\[|\]|\^/
    const newOperands = operands.map(operand => {
      if (specialSymbol.test(operand)) {
        return `\\${operand}`
      }
      return operand
    })
    const languageRegExp = new RegExp(`^(?:${newOperands.join('|')}|N|K)$`, 'g')
    const result = codeArray.map(str => {
      if (str.search(languageRegExp) === -1) {
        return 'V'
      }
      return str
    })

    return result.join('')
  }
}

module.exports = new Tokenization()