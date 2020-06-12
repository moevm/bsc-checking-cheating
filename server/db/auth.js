const authModule = (db, jwt) => ({
  login(req, res) {
    const login = req.body

    db.one(`
      select * from user_info
      where email = $[email]
    `, login)
      .then(user => {
        if (!user) {
          res.status(404).send('No such user')
        }

        if (user.password !== login.password) {
          res.status(401).send('Wrong password')
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 86400
        })

        res.status(200).send({ token })
      })
      .catch(err => {
        res.status(500).send('Error on server')
      })
  }
})

module.exports = authModule