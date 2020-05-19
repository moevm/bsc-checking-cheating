const pgp = require('pg-promise')()

const student = require('./student')
const teacher = require('./teacher')

const db = pgp('postgres://pguser:password@localhost:5432/antiplagiat')

module.exports = {
  student: student(db),
  teacher: teacher(db)
}