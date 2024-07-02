import React, { useState, useEffect } from "react";

const QuestionCard = () => {
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Backend'den verileri çekme
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tests');
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  // Veriler yüklenmeden önceki durum
  if (tests.length === 0) {
    return <div>Loading...</div>;
  }

  const currentTest = tests[currentTestIndex];
  const currentQuestion = currentTest.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setShowAnswer(false);
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentTestIndex < tests.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePreviousQuestion = () => {
    setShowAnswer(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentTestIndex > 0) {
      setCurrentTestIndex(currentTestIndex - 1);
      setCurrentQuestionIndex(
        tests[currentTestIndex - 1].questions.length - 1
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-3">
      <div className="flex flex-col justify-around w-full min-h-[600px] md:w-[800px] md:h-[600px] border border-cyan-900 rounded-xl bg-cyan-700 shadow-2xl px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-yellow-400 text-3xl">Test Name</div>
          <div className="text-white mt-2">{currentTest.testName}</div>
        </div>
        <hr />
        <div className="flex flex-col items-center justify-center">
          <div className="text-yellow-400 text-3xl">Question</div>
          <div className="text-white mt-2">{currentQuestion.question}</div>
        </div>
        <hr />
        {showAnswer && (
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="text-yellow-400 text-3xl">Answer</div>
            <div className="text-white mt-2">{currentQuestion.answer}</div>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handlePreviousQuestion}
          className="p-3 bg-green-700 text-white rounded-lg mt-1 hover:opacity-90"
        >
          Previous
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="p-3 bg-yellow-500 w-full md:w-[600px] rounded-3xl mt-1 hover:opacity-90"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <button
          onClick={handleNextQuestion}
          className="p-3 bg-green-700 text-white rounded-lg mt-1 hover:opacity-90"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;