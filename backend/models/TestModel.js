const mongoose = require('mongoose');

// Schema tanımı
const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const TestSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  questions: [QuestionSchema]
});

// Middleware to delete all questions when a test is deleted
TestSchema.pre('findOneAndDelete', async function (next) {
  const testId = this.getQuery()["_id"];
  await mongoose.model('Test').updateOne(
    { _id: testId },
    { $set: { questions: [] } }
  );
  next();
});

// Model tanımı
const Test = mongoose.model('Test', TestSchema);

module.exports = Test;