const { findFingerprint, findSimilarity } = require('../antiplagiat')

module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getStudentInfo(req, res, next) {
      db.task(async t => {
        const studentInfo = await db.one('select id, name, group_number from student', req.params)
        const subjects = await db.any(`
          select subject.id, subject.name from student
          inner join teacher_subject
          on student.group_number = any (teacher_subject.groups)
          inner join subject
          on subject.id = teacher_subject.subject_id
          where student.id = $[id]
        `, req.params)

        for (let subject of subjects) {
          subject.tasks = await db.any(`
            select id, name from task
            where subject_id = $[subject_id] and $[group] = any (groups)
          `, {
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

    checkSolution(req, res, next) {
      const buf = Buffer.from(req.file.buffer)
      const fingerprint = findFingerprint(buf.toString())

      db.task(async  t => {
        const hashes = await db.many(`
          select id, fingerprint from solution
          where task_id != $[task_id] or student_id != $[student_id]
        `, req.body)
        const [originality, reference] = findSimilarity(hashes, fingerprint)

        await db.none(`
          insert into solution (task_id, student_id, subject_id, originality, date, fingerprint, file, reference_id)
          values ($[task_id], $[student_id], $[subject_id], $[originality], NOW(), $[fingerprint], $[file], $[reference_id])
          on conflict on constraint solution_pkey
          do update 
          set fingerprint = $[fingerprint],
              file = $[file],
              originality = $[originality],
              reference_id = $[reference_id],
              date = NOW()
          where solution.task_id = excluded.task_id and solution.student_id = excluded.student_id
        `, {
          ...req.body,
          file: `\\x${buf.toString('hex')}`,
          fingerprint,
          originality,
          reference_id: reference.id
        })
        return originality
      })
        .then(data => {
          res.status(200)
            .json({
              originality: data
            })
        })
        .catch(err => {
          console.log(err)
          res.status(400)
        })
    }
  }
}
