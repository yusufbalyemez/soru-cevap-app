const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/tests', questionController.getAllTests);
router.post('/tests', questionController.addTest); // Yeni rota
router.post('/tests/:testIndex/questions', questionController.addQuestion);
router.delete('/tests/:testIndex/questions/:questionIndex', questionController.deleteQuestion);
router.put('/tests/:testIndex/questions/:questionIndex', questionController.updateQuestion);

module.exports = router;