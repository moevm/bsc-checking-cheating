module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getTeacherInfo(req, res, next) {
      db.one('select id, name, login from teacher where id = ${id}', req.body)
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
    },

    postNewSubject(req, res, next) {
      db.none('insert into subject (name, teacher_id, groups) values (${name}, ${teacher_id}, ${groups})', req.body)
        .then(function() {
          res.status(200)
            .json({
              status: 'success',
              message: 'ok'
            })
        })
        .catch(function(err) {
          res.status(400)
            .json({
              status: 'error',
              message: 'wrong request data'
            })
        })
    }
  }
}
