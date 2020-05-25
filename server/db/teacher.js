const teacher = db => ({
  // TODO: remove after making jwt auth
  getTeacherInfo(req, res, next) {
    db.task(async t => {
      const teacherInfo = await db.one('select id, name, login from teacher where id = ${id}', req.params)
      const subjects = await db.any('select * from subject where teacher_id = ${id}', req.params)
      
      for (subject of subjects) {
        const tasks = await db.any('select * from task where teacher_id = ${id} and subject_id = ${subjectId}', { ...req.params, subjectId: subject.id })

        subject.tasks = tasks
      }
      teacherInfo.subjects = subjects
    
      return teacherInfo
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

  updateSubject(req, res, next) {
    db.none(`
      update subject
      set name = $[name],
          groups = $[groups]
      where id = $[id]
    `, req.body)
      .then(() => {
        res.status(200)
          .json('ok')
      })
      .catch(error => {
        res.status(400)
          .json({
            status: 'error',
            message: 'wrong request data'
          })
      })
  },

  deleteSubject(req, res, next) {
    db.none(`
      delete from subject
      where id = $[id]
    `, req.body)
      .then(() => {
        res.status(200)
          .json('ok')
      })
      .catch(error => {
        res.status(400)
          .json({
            status: 'error',
            message: 'wrong request data'
          })
      })
  },

  getTaskInfo(req, res) {
    db.task(async t => {
      const taskInfo = await db.one(`
          select * from task
          where id = $[id]
        `, req.params)
      const solutions = await db.any(`
          select solution.task_id, student.name, student.group_number, originality from solution
          inner join student
          on student.id = solution.student_id
          where solution.task_id = $[id]
        `, req.params)

      taskInfo.solutions = solutions

      return taskInfo
    })
      .then(task => {
        res.status(200)
          .json(task)
      })
      .catch(error => {
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
  },

  updateTask(req, res) {
    console.log(req.body)
    db.none(`
      update task
      set name = $[name],
          exts = $[exts]
      where id = $[id]
    `, req.body)
      .then(() => {
        res.status(200)
          .json('ok')
      })
      .catch(error => {
        res.status(400)
          .json({
            status: 'error',
            message: 'wrong request data'
          })
      })
  },

  getSolutions(req, res, next) {
    db.any(`
      select solution.id, solution.task_id, student.name, student.group_number, originality from solution
      inner join student
      on student.id = solution.student_id
      where solution.task_id = $[id]
    `, req.params)
      .then(data => [
        res.status(200)
          .json(data)
      ])
      .catch(error => {
        res.status(400)
          .json({
            status: 'error',
            message: 'wrong request data'
          })
      })
  }
})

module.exports = teacher
