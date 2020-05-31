const { findFingerprint, findSimilarity } = require('../antiplagiat')

module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getStudentInfo(req, res, next) {
      db.task(async t => {
        const studentInfo = await db.one(`
          select id, name, group_number from student
          where id = $[id]
        `, req.params)
        const subjects = await db.any(`
          select subject.id, subject.name from student
          inner join teacher_subject
          on student.group_number = any (teacher_subject.groups)
          inner join subject
          on subject.id = teacher_subject.subject_id
          where student.id = $[id]
          order by subject.name
        `, req.params)

        for (let subject of subjects) {
          subject.tasks = await db.any(`
            select task.id, task.name, task.subject_id, task.bound, solution.originality, task.check_type, task.exts, task.description from task
            left join solution
            on task.id = solution.task_id
            where $[group] = any (groups) and task.subject_id = $[subject_id] and (solution.student_id = $[id] or solution.student_id is null)
            order by task.created_at
          `, {
            id: studentInfo.id,
            subject_id: subject.id,
            group: studentInfo.group_number
          })
        }

        studentInfo.subjects = subjects
        return studentInfo
      })     
        .then((data) => res.status(200).json(data))
        .catch(function(err) {
          console.log(err)
          res.status(400)
          .json({
            status: 'error',
            message: 'no such user'
          })
        })
    },

    checkSolution(req, res) {
      const buf = Buffer.from(req.file.buffer)
      const fingerprint = findFingerprint(buf.toString())
      const getQueryByType = type => {
        switch (type) {
          case 'task':
            return 'and task_id = $[task_id]'
          case 'subject':
            return 'and subject_id = $[subject_id]'
          default:
            return ''
        }
      }

      db.task(async  t => {
        const hashes = await db.any(`
          select id, fingerprint from solution
          where student_id != $[student_id] ${getQueryByType(req.body.check_type)} 
        `, req.body)
        const [originality, reference] = findSimilarity(hashes, fingerprint)

        const result = await db.one(`
          insert into solution (task_id, student_id, subject_id, originality, fingerprint, file, reference_id, file_name)
          values ($[task_id], $[student_id], $[subject_id], $[originality], $[fingerprint], $[file], $[reference_id], $[file_name])
          on conflict on constraint solution_pkey
          do update 
          set fingerprint = $[fingerprint],
              file = $[file],
              originality = $[originality],
              reference_id = $[reference_id],
              created_at = NOW(),
              file_name = $[file_name]
          where solution.task_id = excluded.task_id and solution.student_id = excluded.student_id
          returning originality
        `, {
          ...req.body,
          file: `\\x${buf.toString('hex')}`,
          file_name: req.file.originalname,
          fingerprint,
          originality: originality,
          reference_id: reference && reference.id
        })

        return result
      })
        .then(data => res.status(200).json(data))
        .catch(err => {
          console.log(err)
          res.status(400).json('error')
        })
    }
  }
}
