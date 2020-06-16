const router = require('express').Router()
const upload = require('multer')()

const db = require('../db/index')
const middleware = require('./middleware')

router.get('/admin', middleware('admin'), db.admin.getInfo)
router.post('/user_info', middleware('admin'), db.admin.addUser)
router.post('/subject', middleware('admin'), db.admin.addSubject)
router.post('/group', middleware('admin'), db.admin.addGroup)
router.post('/semestr', middleware('admin'), db.admin.addSemestr)

router.post('/auth', db.auth.login)
router.get('/student_info', middleware('student'), db.student.getStudentInfo)
router.put('/solution', upload.single('solution'), middleware('student'), db.student.checkSolution)

router.get('/teacher_info', middleware('teacher'), db.teacher.getTeacherInfo)
router.get('/task/:id', middleware('teacher'), db.teacher.getTaskInfo)
router.post('/task', middleware('teacher'), db.teacher.createTask)
router.patch('/task', middleware('teacher'), db.teacher.updateTask)
router.delete('/task/:id', middleware('teacher'), db.teacher.deleteTask)
router.get('/solution', middleware('teacher'), db.teacher.getStudentSolution)

// router.patch('/subject', db.teacher.updateSubject)
// router.delete('/subject', db.teacher.deleteSubject)

module.exports = router
