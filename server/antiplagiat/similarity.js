module.exports = (solutions, fingerprint) => {
  let result = 0
  let reference = null

  solutions.forEach((solution, index) => {
    let count = 0

    if (solution.fingerprint) {
      fingerprint.forEach(newHash => {
        solution.fingerprint.forEach((hash, index) => {
          if (hash === newHash) {
            solution.fingerprint[index] = -1
            count += 1
            return
          }
        })
      })  
  
      if (!result || count > result) {
        result = count
        reference = solution
      }
    }
  })
  return [Math.round((fingerprint.length - result) / fingerprint.length * 100), reference]
}