const pgp = require('pg-promise')()
const jwt = require('jsonwebtoken')

const auth = require('./auth')
const student = require('./student')
const teacher = require('./teacher')

const db = pgp(process.env.DATABASE_URL)

module.exports = {
  auth: auth(db, jwt),
  student: student(db),
  teacher: teacher(db)
}
