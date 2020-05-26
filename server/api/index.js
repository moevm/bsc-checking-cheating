const path = require('path')
const router = require('express').Router()
const upload = require('multer')()

const db = require('../db/index')

router.get('/student_info/:id', db.student.getStudentInfo)
router.put('/solution', upload.single('solution'), db.student.checkSolution)
router.get('/teacher_info/:id', db.teacher.getTeacherInfo)
router.post('/subject', db.teacher.createSubject)
router.patch('/subject', db.teacher.updateSubject)
router.delete('/subject', db.teacher.deleteSubject)
router.get('/task/:id', db.teacher.getTaskInfo)
router.post('/task', db.teacher.createTask)
router.patch('/task', db.teacher.updateTask)

module.exports = router