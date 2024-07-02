const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/questions.json');

// Helper function to read data from JSON file
const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Helper function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.getAllTests = (req, res) => {
  const data = readData();
  res.json(data.tests);
};

exports.addTest = (req, res) => {
  const data = readData();
  const { testName } = req.body;

  if (data.tests.find(test => test.testName === testName)) {
    return res.status(400).json({ message: 'Test already exists' });
  }

  const newTest = {
    testName,
    questions: []
  };

  data.tests.push(newTest);
  writeData(data);
  res.status(201).json(newTest);
};

exports.addQuestion = (req, res) => {
  const data = readData();
  const { testIndex } = req.params;
  const { question, answer } = req.body;

  if (data.tests[testIndex]) {
    data.tests[testIndex].questions.push({ question, answer });
    writeData(data);
    res.status(201).json(data.tests[testIndex]);
  } else {
    res.status(404).json({ message: 'Test not found' });
  }
};

exports.deleteQuestion = (req, res) => {
  const data = readData();
  const { testIndex, questionIndex } = req.params;

  if (data.tests[testIndex] && data.tests[testIndex].questions[questionIndex]) {
    data.tests[testIndex].questions.splice(questionIndex, 1);
    writeData(data);
    res.status(200).json(data.tests[testIndex]);
  } else {
    res.status(404).json({ message: 'Test or Question not found' });
  }
};

exports.updateQuestion = (req, res) => {
  const data = readData();
  const { testIndex, questionIndex } = req.params;
  const { question, answer } = req.body;

  if (data.tests[testIndex] && data.tests[testIndex].questions[questionIndex]) {
    data.tests[testIndex].questions[questionIndex] = { question, answer };
    writeData(data);
    res.status(200).json(data.tests[testIndex]);
  } else {
    res.status(404).json({ message: 'Test or Question not found' });
  }
};