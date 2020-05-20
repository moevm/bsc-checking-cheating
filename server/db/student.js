module.exports = function (db) {
  return {
    // TODO: remove after making jwt auth
    getStudentInfo(req, res, next) {
      console.log(req.params)
      db.task(async t => {
        const studentInfo = await db.one('select name, group_number, login from student where id = ${id}', req.params)
        const tasks = await db.any('select task.subject_id, subject.name as subject_name, task.id, task.name, task.exts from subject inner join task on subject.id = task.subject_id where ${group} = any (task.groups)', {
            group: studentInfo.group_number 
          })

        tasks.forEach(item => {
          console.log(item)
          const new_task = {
            id: item.id,
            name: item.name,
            exts: item.exts
          }
          const new_subject = {
            id: item.subject_id,
            name: item.subject_name,
            tasks: [new_task]
          }

          if (studentInfo.subjects) {
            const subject = studentInfo.subjects.find(subject => subject.id === item.subject_id)

            if (subject) {
              subject.tasks.push(new_task)
            } else {
              studentInfo.subjects.push(new_subject)
            }
          } else {
            studentInfo.subjects = [new_subject]
          }
        })
      
        console.log(studentInfo)

        studentInfo.tasks = tasks
        return studentInfo
      })     
        .then(function(data) {
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
    }
  }
}
