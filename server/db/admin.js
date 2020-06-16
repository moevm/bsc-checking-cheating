const admin = db => ({
  getInfo(req, res) {
    db.task(async t => {
      const res = {}

      res.teachers = await db.any(
        `
          select id, email, name, created_at from user_info
          where access_type = 'teacher'
        `
      )
      res.students = await db.any(
        `
          select user_info.id, email, name, group_number.number as group_number, user_info.created_at from user_info
          inner join group_number
          on user_info.group_id = group_number.id
          where access_type = 'student'
        `
      )
      res.subjects = await db.any(
        `
          select * from subject
        `
      )
      res.groups = await db.any(
        `
          select * from group_number
          order by number
        `
      )

      return res
    })
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.log(err)

        res.status(500).json('Error on server')
      })
  },

  addUser(req, res) {
    db.one(
      `
        insert into user_info (email, password, name, group_id, access_type)
        values ($[email], $[password], $[name], $[group_id], $[access_type])
        returning id
      `,
      req.body
    )
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.log(err)

        res.status(500).json('Error on server')
      })
  },

  addSubject(req, res) {
    db.one(
      `
        insert into subject (name)
        values ($[name])
        returning id
      `,
      req.body
    )
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json('Error on server'))
  },

  addGroup(req, res) {
    db.one(
      `
        insert into group_number (number)
        values ($[number])
        returning id
      `,
      req.body
    )
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.log(err)

        res.status(500).json('Error on server')
      })
  },

  addSemestr(req, res) {
    db.none(
      `
        insert into teacher_subject (teacher_id, subject_id, group_ids)
        values ($[teacher_id], $[subject_id], $[group_ids])
      `,
      req.body
    )
      .then(() => res.status(200).json('ok'))
      .catch(err => {
        console.log(err)

        res.status(500).json('Error on server')
      })
  }
})

module.exports = admin
