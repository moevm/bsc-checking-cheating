const path = require('path')
const router = require('express').Router()
const upload = require('multer')()

const db = require('../db/index')

router.get('/student_info/:id', db.student.getStudentInfo)
router.post('/solution', upload.single('solution'), db.student.checkSolution)
router.get('/solutions/:id', db.teacher.getSolutions)
router.get('/teacher_info/:id', db.teacher.getTeacherInfo)
router.post('/subject', db.teacher.createSubject)
router.post('/task', db.teacher.createTask)

module.exports = router