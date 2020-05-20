module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getStudentInfo(req, res, next) {
      console.log(req.params)
      db.task(async t => {
        const studentInfo = await db.one('select name, group_number, login from student where id = ${id}', req.params)
        const tasks = await db.any('select * from task where ${group} = any (groups)', { group: studentInfo.group_number })

        studentInfo.tasks = tasks
        return studentInfo
      })     
        .then(function(data) {
          res.status(200)
            .json(data)
        })
        .catch(function(err) {
          res.status(400)
          .json({
            status: 'error',
            message: 'no such user'
          })
        })
    }
  }
}
