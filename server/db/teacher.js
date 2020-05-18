module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getTeacherInfo(req, res, next) {
      db.one('select name, login from teacher where id = 1')
        .then(function(data) {
          res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'ok'
            })
        })
        .catch(function(err) {
          return next(err)
        })
    }
  }
}
