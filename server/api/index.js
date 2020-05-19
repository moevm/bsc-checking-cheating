const path = require('path')
const router = require('express').Router()

const db = require('../db/index')

router.get('/student_info', db.student.getStudentInfo)
router.get('/teacher_info', db.teacher.getTeacherInfo)
router.post('/add_subject', db.teacher.postNewSubject)


module.exports = router