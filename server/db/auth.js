const authModule = (db, jwt) => ({
  login(req, res) {
    const login = req.body

    db.one(`
      select * from user_info
      where email = $[email]
    `, login)
      .then(user => {
        if (!user) {
          res.status(404).json('No such user')
        }

        if (user.password !== login.password) {
          res.status(401).json('Wrong password')
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 86400
        })

        res.status(200).json({ token, access_type: user.access_type })
      })
      .catch(err => {
        res.status(500).json('Error on server')
      })
  }
})

module.exports = authModule