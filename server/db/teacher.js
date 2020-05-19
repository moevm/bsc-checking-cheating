module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getTeacherInfo(req, res, next) {
      db.task(async t => {
        const teacher_info = await db.one('select id, name, login from teacher where id = ${id}', req.params)
        const subjects = await db.any('select * from subject where teacher_id = ${id}', req.params)
        
        for (subject of subjects) {
          const tasks = await db.any('select * from task where teacher_id = ${id} and subject_id = ${subjectId}', { ...req.params, subjectId: subject.id })

          subject.tasks = tasks
        }
        teacher_info.subjects = subjects
      
        return teacher_info
      })
        .then(function (data) {
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
    },

    createSubject(req, res, next) {
      console.log(req.body)
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
    },

    createTask(req, res, next) {
      db.none('insert into task (name, exts, groups, subject_id, teacher_id) values (${name}, ${exts}, ${groups}, ${subject_id}, ${teacher_id})', req.body)
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
