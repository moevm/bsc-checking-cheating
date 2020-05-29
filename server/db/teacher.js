const teacher = db => ({
  // TODO: remove after making jwt auth
  getTeacherInfo(req, res) {
    db.task(async t => {
      const teacherInfo = await db.one('select id, name from teacher where id = ${id}', req.params)
      const subjects = await db.any(`
        select subject.id, subject.name, teacher_subject.groups from subject
        inner join teacher_subject
        on subject.id = teacher_subject.subject_id
        where teacher_subject.teacher_id = $[id]
        order by subject.name      
      `, req.params)
      
      for (subject of subjects) {
        const tasks = await db.any(`
          select id, name, subject_id from task
          where teacher_id = $[id] and subject_id = $[subjectId]
          order by created_at
        `, { ...req.params, subjectId: subject.id })

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
        console.log(err)
        res.status(400)
          .json('oшибка')
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
          select solution.task_id, solution.student_id, student.name, student.group_number, originality, solution.created_at, reference_id from solution
          inner join student
          on student.id = solution.student_id
          where solution.task_id = $[id]
        `, req.params)
      const subject = await db.one(`
          select groups from teacher_subject
          where teacher_id = $[teacher_id] and subject_id = $[subject_id]
      `, taskInfo)

      taskInfo.subjectGroups = subject.groups
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

  createTask(req, res) {
    db.one(`
      insert into task (name, exts, groups, subject_id, teacher_id, check_type, bound) 
      values ($[name], $[exts], $[groups], $[subject_id], $[teacherId], $[checkType], $[bound])
      returning id
      `, req.body)
      .then(data => res.status(200).json(data))
      .catch(function(err) {
        console.log(err)
        res.status(400)
          .json({
            status: 'error',
            message: 'wrong request data'
          })
      })
  },

  updateTask(req, res) {
    db.none(`
      update task
      set name = $[name],
          exts = $[exts],
          check_type = $[check_type],
          description = $[description],
          bound = $[bound],
          groups = $[groups]
      where id = $[id]
    `, req.body)
      .then(() => res.status(200).json('ok'))
      .catch(error => {
        res.status(400)
          .json({
            status: 'error',
            message: 'wrong request data'
          })
      })
  },

  deleteTask(req, res) {
    db.none(`
      delete from task cascade
      where id = $[id]
    `, req.params)
      .then(() => res.status(200).json('ok'))
      .catch(err => {
        console.log(err)
        res.status(400).json('not ok')
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
  },

  getStudentSolution(req, res) {
    db.task(async t => {
      const currentFile = await db.one(`
        select student.name, student.group_number as group, solution.file from solution
        inner join student
        on student.id = solution.student_id
        where task_id = $[task_id] and student_id = $[student_id]
      `, req.query)
      const referenceFile = req.query.reference_id && await db.one(`
        select student.name, student.group_number as group, solution.file from solution
        inner join student
        on student.id = solution.student_id
        where solution.id = $[reference_id]
      `, req.query)

      return {
        reference: referenceFile ? {
          title: `${referenceFile.name} гр.${referenceFile.group}`,
          file: referenceFile.file.toString()
        } : {
          title: 'Похожие решения отсутствуют',
          file: ''
        },
        current: {
          title: `${currentFile.name} гр.${currentFile.group}`,
          file: currentFile.file.toString()
        }
      }
    })
      .then(data => {
        res.status(200)
          .send(data)
      })
      .catch(err => {
        console.log(err)
        res.status(400)
          .json(err)
      })
  }
})

module.exports = teacher
