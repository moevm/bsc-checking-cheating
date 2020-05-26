module.exports = (solutions, fingerprint) => {
  let result = 0

  solutions.forEach((solution, index) => {
    let count = 0

    if (solution.hashes) {
      fingerprint.forEach(newHash => {
        solution.hashes.forEach((hash, index) => {
          if (hash === newHash) {
            solution.hashes[index] = -1
            count += 1
            return
          }
        })
      })  
  
      if (!result || count > result) {
        result = count
      }
    }
  })

  return (fingerprint.length - result) / fingerprint.length
}