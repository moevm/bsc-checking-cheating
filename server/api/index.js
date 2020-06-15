const router = require('express').Router()
const upload = require('multer')()

const db = require('../db/index')
const middleware = require('./middleware')

router.get('/admin', middleware('admin'), db.admin.getInfo)
router.post('/user_info', middleware('admin'), db.admin.addUser)
router.post('/subject', middleware('admin'), db.admin.addSubject)
router.post('/group', middleware('admin'), db.admin.addGroup)

router.post('/auth', db.auth.login)
router.get('/student_info', middleware('student'), db.student.getStudentInfo)
router.get('/solution', db.teacher.getStudentSolution)
router.put('/solution', upload.single('solution'), db.student.checkSolution)
router.get('/teacher_info', middleware('teacher'), db.teacher.getTeacherInfo)
router.patch('/subject', db.teacher.updateSubject)
router.delete('/subject', db.teacher.deleteSubject)
router.get('/task/:id', db.teacher.getTaskInfo)
router.post('/task', db.teacher.createTask)
router.patch('/task', db.teacher.updateTask)
router.delete('/task/:id', db.teacher.deleteTask)

module.exports = router
