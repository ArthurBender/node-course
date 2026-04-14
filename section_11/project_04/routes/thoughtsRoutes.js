const express = require('express');
const router = express.Router();
const ThoughtsController = require('../controllers/ThoughtsController');
const checkAuth = require('../helpers/auth');

router.get('/dashboard', checkAuth, ThoughtsController.dashboard);
router.post('/delete/:id', checkAuth, ThoughtsController.deleteThought);
router.get('/edit/:id', checkAuth, ThoughtsController.editThought);
router.post('/update/:id', checkAuth, ThoughtsController.updateThought);
router.post('/create', checkAuth, ThoughtsController.createThought);
router.get('/new', checkAuth, ThoughtsController.newThought);
router.get('/', ThoughtsController.listThoughts);

module.exports = router;