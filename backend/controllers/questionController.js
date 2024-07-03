const Test = require('../models/TestModel'); // Modelinizi doğru yola göre değiştirin

// Tüm testleri al
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tests', error: err });
  }
};

// Tek bir testi al
exports.getTestById = async (req, res) => {
  const { testId } = req.params;
  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching test', error: err });
  }
};

// Yeni test ekle
exports.addTest = async (req, res) => {
  const { testName } = req.body;
  try {
    // Test isminin zaten var olup olmadığını kontrol et
    const existingTest = await Test.findOne({ testName });
    if (existingTest) {
      return res.status(400).json({ message: 'Test already exists' });
    }
    const newTest = new Test({ testName, questions: [] });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ message: 'Error adding test', error: err });
  }
};

// Teste soru ekle
exports.addQuestion = async (req, res) => {
  const { question, answer,testId } = req.body;

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    test.questions.push({ question, answer });
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: 'Error adding question', error: err });
  }
};

// Soruyu sil
exports.deleteQuestion = async (req, res) => {
  const { testId, questionId } = req.params;
  try {
    const test = await Test.findByIdAndUpdate(testId, {
      $pull: { questions: { _id: questionId } }
    }, { new: true });
    if (!test) {
      return res.status(404).json({ message: 'Test or Question not found' });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting question', error: err });
  }
};

// Soruyu güncelle
exports.updateQuestion = async (req, res) => {
  const { testId, questionId } = req.params;
  const { question, answer } = req.body;
  try {
    const test = await Test.findOneAndUpdate({ "_id": testId, "questions._id": questionId }, {
      "$set": {
        "questions.$.question": question,
        "questions.$.answer": answer
      }
    }, { new: true });
    if (!test) {
      return res.status(404).json({ message: 'Test or Question not found' });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: 'Error updating question', error: err });
  }
};

// Test adını güncelle
exports.updateTestName = async (req, res) => {
  const { testId } = req.params;
  const { testName } = req.body;
  try {
    const test = await Test.findByIdAndUpdate(testId, { testName }, { new: true });
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: 'Error updating test name', error: err });
  }
};

// Test sil
exports.deleteTest = async (req, res) => {
  const { testId } = req.params;
  try {
    const test = await Test.findOneAndDelete({ _id: testId });
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting test', error: err });
  }
};

