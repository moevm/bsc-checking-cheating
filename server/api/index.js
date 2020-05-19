const path = require('path')
const router = require('express').Router()

const db = require('../db/index')

router.get('/student_info', db.student.getStudentInfo)
router.get('/teacher_info', db.teacher.getTeacherInfo)
router.post('/add_subject', db.teacher.createSubject)
router.post('/add_task', db.teacher.createTask)

module.exports = router