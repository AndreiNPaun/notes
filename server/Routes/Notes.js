const express = require('express');
const router = express.Router();

const NotesController = require('../Controllers/NotesController');
const authenticate = require('../middleware/Authenticate');

router.get('/', authenticate, NotesController.list);
router.post('/write', NotesController.write);

module.exports = router;
//authenticate,
