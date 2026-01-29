const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const auth = require('../middleware/auth');

router.get('/domains', auth, interviewController.getDomains);
router.post('/domains', auth, interviewController.createDomain); // Admin only? Add check later
router.post('/start', auth, interviewController.startInterview);
router.post('/answer', auth, interviewController.submitAnswer);
router.post('/save', auth, interviewController.saveAttempt);

module.exports = router;
