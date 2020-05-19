module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getStudentInfo(req, res, next) {
      db.one('select name, group_number, login from student where id = 1')
        .then(function(data) {
          res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'ok'
            })
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
