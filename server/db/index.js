const pgp = require('pg-promise')()

const student = require('./student')
const teacher = require('./teacher')

const db = pgp(process.env.DATABASE_URL)

module.exports = {
  student: student(db),
  teacher: teacher(db)
}