const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/tests', questionController.getAllTests);
router.get('/tests/:testId', questionController.getTestById); // Tek bir testi al
router.post('/tests', questionController.addTest);
router.post('/tests/questions', questionController.addQuestion); // Düzenlendi
router.delete('/tests/:testId/questions/:questionId', questionController.deleteQuestion);
router.put('/tests/:testId/questions/:questionId', questionController.updateQuestion);
router.put('/tests/:testId', questionController.updateTestName);
router.delete('/tests/:testId', questionController.deleteTest); // Testi sil

module.exports = router;