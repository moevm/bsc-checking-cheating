const router = require('express').Router()
const upload = require('multer')()

const db = require('../db/index')
const middleware = require('./middleware')

router.post('/auth', db.auth.login)
router.get('/student_info', middleware, db.student.getStudentInfo)
router.get('/solution', db.teacher.getStudentSolution)
router.put('/solution', upload.single('solution'), db.student.checkSolution)
router.get('/teacher_info', middleware, db.teacher.getTeacherInfo)
router.post('/subject', db.teacher.createSubject)
router.patch('/subject', db.teacher.updateSubject)
router.delete('/subject', db.teacher.deleteSubject)
router.get('/task/:id', db.teacher.getTaskInfo)
router.post('/task', db.teacher.createTask)
router.patch('/task', db.teacher.updateTask)
router.delete('/task/:id', db.teacher.deleteTask)

module.exports = router
