const tokenization = require('../antiplagiat/tokenization')
const { language } = require('../antiplagiat/tokenization')

const teacher = db => ({
  // TODO: remove after making jwt auth
  getTeacherInfo(req, res) {
    db.task(async t => {
      const teacherInfo = await db.one('select id, name from user_info where id = ${id}', {
        id: req.id
      })
      const groups = await db.many('select id, number from group_number')
      const subjects = await db.any(
        `
        select subject.id, subject.name, teacher_subject.group_ids as groups from subject
        inner join teacher_subject
        on subject.id = teacher_subject.subject_id
        where teacher_subject.teacher_id = $[id]
        order by subject.name      
      `,
        { id: teacherInfo.id }
      )

      for (subject of subjects) {
        const tasks = await db.any(
          `
          select id, name, subject_id from task
          where teacher_id = $[id] and subject_id = $[subjectId]
          order by created_at
        `,
          { id: teacherInfo.id, subjectId: subject.id }
        )
        subject.groups = groups.filter(group => !!subject.groups.find(id => id === group.id))
        subject.tasks = tasks
      }
      teacherInfo.subjects = subjects
      teacherInfo.exts = tokenization.languages.exts

      return teacherInfo
    })
      .then(function (data) {
        res.status(200).json(data)
      })
      .catch(function (err) {
        console.log(err)
        res.status(400).json('oшибка')
      })
  },

  getTaskInfo(req, res) {
    db.task(async t => {
      const taskInfo = await db.one(
        `
          select * from task
          where id = $[id]
        `,
        req.params
      )
      const solutions = await db.any(
        `
          select solution.task_id, solution.student_id, student.name, student.group_number, originality, solution.created_at, reference_id from solution
          inner join student
          on student.id = solution.student_id
          where solution.task_id = $[id]
        `,
        req.params
      )
      const groups = await db.many(
        `
          select * from group_number
          order by number
        `
      )
      const subject = await db.one(
        `
          select group_ids from teacher_subject
          where teacher_id = $[teacher_id] and subject_id = $[subject_id]
      `,
        taskInfo
      )

      taskInfo.groups = taskInfo.group_ids || []
      taskInfo.subjectGroups = groups.filter(group => subject.group_ids.indexOf(group.id) !== -1)
      taskInfo.solutions = solutions

      return taskInfo
    })
      .then(task => {
        res.status(200).json(task)
      })
      .catch(error => {
        console.log(error)

        res.status(400).json({
          status: 'error',
          message: 'wrong request data'
        })
      })
  },

  createTask(req, res) {
    db.one(
      `
      insert into task (name, exts, group_ids, subject_id, teacher_id, check_type, bound) 
      values ($[name], $[exts], $[groups], $[subject_id], $[teacherId], $[check_type], $[bound])
      returning id
      `,
      {
        ...req.body,
        teacherId: req.id
      }
    )
      .then(data => res.status(200).json(data))
      .catch(function (err) {
        console.log(err)
        res.status(400).json({
          status: 'error',
          message: 'wrong request data'
        })
      })
  },

  updateTask(req, res) {
    db.none(
      `
      update task
      set name = $[name],
          exts = $[exts],
          check_type = $[check_type],
          description = $[description],
          bound = $[bound],
          group_ids = $[groups]
      where id = $[id]
    `,
      req.body
    )
      .then(() => res.status(200).json('ok'))
      .catch(error => {
        console.log(err)

        res.status(400).json({
          status: 'error',
          message: 'wrong request data'
        })
      })
  },

  deleteTask(req, res) {
    db.none(
      `
      delete from task cascade
      where id = $[id]
    `,
      req.params
    )
      .then(() => res.status(200).json('ok'))
      .catch(err => {
        console.log(err)
        res.status(400).json('not ok')
      })
  },

  getSolutions(req, res, next) {
    db.any(
      `
      select solution.id, solution.task_id, student.name, student.group_number, originality from solution
      inner join student
      on student.id = solution.student_id
      where solution.task_id = $[id]
    `,
      req.params
    )
      .then(data => [res.status(200).json(data)])
      .catch(error => {
        res.status(400).json({
          status: 'error',
          message: 'wrong request data'
        })
      })
  },

  getStudentSolution(req, res) {
    db.task(async t => {
      const currentFile = await db.one(
        `
        select student.name, student.group_number as group, solution.file from solution
        inner join student
        on student.id = solution.student_id
        where task_id = $[task_id] and student_id = $[student_id]
      `,
        req.query
      )
      const referenceFile =
        req.query.reference_id &&
        (await db.one(
          `
        select student.name, student.group_number as group, solution.file from solution
        inner join student
        on student.id = solution.student_id
        where solution.id = $[reference_id]
      `,
          req.query
        ))

      return {
        reference: referenceFile
          ? {
              title: `${referenceFile.name} гр.${referenceFile.group}`,
              file: referenceFile.file.toString()
            }
          : {
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
        res.status(200).send(data)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  }
})

module.exports = teacher
