const express = require('express');
const router = express.Router();

const NotesController = require('../Controllers/NotesController');
const authenticate = require('../middleware/Authenticate');

router.get('/', authenticate, NotesController.list);
router.post('/write', authenticate, NotesController.write);
router.post('/delete', authenticate, NotesController.purge);

module.exports = router;
