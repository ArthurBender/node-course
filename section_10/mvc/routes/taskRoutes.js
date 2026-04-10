const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/new', TaskController.newTask);
router.post('/create', TaskController.createTask);
router.post('/update/:id', TaskController.updateTask);
router.post('/update-status/:id', TaskController.updateTaskStatus);
router.get('/delete/:id', TaskController.deleteTask);
router.get('/edit/:id', TaskController.editTask);
router.get('/', TaskController.listTasks);

module.exports = router;