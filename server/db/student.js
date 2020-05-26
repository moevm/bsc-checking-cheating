const { findFingerprint, findSimilarity } = require('../antiplagiat')

module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getStudentInfo(req, res, next) {
      db.task(async t => {
        const studentInfo = await db.any(`
          select distinct on (task.id) task.id as task_id, task.name as task_name, task.exts, task.subject_id, subject.name as subject_name, student.name, solution.originality from task
          inner join subject
          on task.subject_id = subject.id
          inner join student
          on student.group_number = any (task.groups)
          left join solution
          on student.id = solution.student_id and task.id = solution.task_id
          where student.id = $[id]
        `, req.params)
        const result = {
          name: studentInfo[0].name,
          subjects: []
        }

        studentInfo.forEach(item => {
          const new_task = {
            id: item.task_id,
            name: item.task_name,
            exts: item.exts,
            subjectId: item.subject_id,
            originality: item.originality
          } 
          const new_subject = {
            id: item.subject_id,
            name: item.subject_name,
            tasks: [new_task]
          }
          const subject = result.subjects.find(subject => subject.id === item.subject_id)

          if (subject) {
            subject.tasks.push(new_task)
          } else {
            result.subjects.push(new_subject)
          }
        })
        return result
      })     
        .then(function(data) {
          res.status(200)
            .json(data)
        })
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
      console.log(req.body)

      db.task(async  t => {
        const hashes = await db.many(`select task_id, student_id, hashes from solution`)
        const originality = Math.round(findSimilarity(hashes, fingerprint) * 100)

        await db.none(`
          insert into solution (task_id, student_id, subject_id, originality)
          values ($[task_id], $[student_id], $[subject_id], $[originality])
          on conflict on constraint solution_pkey
          do update 
          set originality = $[originality]
          where solution.task_id = excluded.task_id and solution.student_id = excluded.student_id
        `, {
          ...req.body,
          originality: 33
        })

        console.log(`originality: ${originality}%`)
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

      // db.none(`
      //     insert into solution (task_id, student_id, hashes, file) 
      //     values ($[task_id], $[student_id], $[fingerprint], $[buf])
      //   `, {
      //     ...req.body,
      //     fingerprint,
      //     buf: `\\x${buf.toString('hex')}`
      //   })
    }
  }
}
