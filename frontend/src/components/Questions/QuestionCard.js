import React, { useState, useEffect } from "react";

const QuestionCard = () => {
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedTest, setSelectedTest] = useState("Tümü");
  const apiUrl = process.env.REACT_APP_API_URL;

  // Backend'den verileri çekme
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tests`);
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [apiUrl]);

  // Veriler yüklenmeden önceki durum
  if (tests.length === 0) {
    return <div>Yükleniyor...</div>;
  }

  const allQuestions = tests.reduce(
    (acc, test) => [...acc, ...test.questions],
    []
  );

  const currentQuestion =
    selectedTest === "Tümü"
      ? allQuestions[currentQuestionIndex]
      : tests[currentTestIndex].questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setShowAnswer(false);
    if (selectedTest === "Tümü") {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      if (currentQuestionIndex < tests[currentTestIndex].questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentTestIndex < tests.length - 1) {
        setCurrentTestIndex(currentTestIndex + 1);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const handlePreviousQuestion = () => {
    setShowAnswer(false);
    if (selectedTest === "Tümü") {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    } else {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (currentTestIndex > 0) {
        setCurrentTestIndex(currentTestIndex - 1);
        setCurrentQuestionIndex(
          tests[currentTestIndex - 1].questions.length - 1
        );
      }
    }
  };

  const handleTestChange = (e) => {
    const selectedTestName = e.target.value;
    setSelectedTest(selectedTestName);
    setCurrentQuestionIndex(0);
    setShowAnswer(false);

    if (selectedTestName === "Tümü") {
      setCurrentTestIndex(0);
    } else {
      const selectedTestIndex = tests.findIndex(
        (test) => test.testName === selectedTestName
      );
      setCurrentTestIndex(selectedTestIndex);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 px-1 mt-16">
      <div className="mb-4">
        <select
          value={selectedTest}
          onChange={handleTestChange}
          className="p-2 border border-gray-400 rounded"
        >
          <option value="Tümü">Tümü</option>
          {tests.map((test, index) => (
            <option key={index} value={test.testName}>
              {test.testName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col justify-around w-full min-h-[450px] md:w-[800px] md:h-[600px] border border-cyan-900 rounded-xl bg-cyan-700 shadow-2xl px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-yellow-400 text-3xl">
            {selectedTest === "Tümü"
              ? "Tüm Testler"
              : tests[currentTestIndex].testName}
          </div>
          <div className="text-white mt-2 min-h-[50px]">
            {selectedTest === "Tümü"
              ? allQuestions[currentQuestionIndex].question
              : currentQuestion.question}
          </div>
        </div>
        <hr className="w-full border-t border-white" />
        <div className="flex flex-col items-center justify-center mt-10 min-h-[100px]">
          {showAnswer ? (
            <>
              <div className="text-yellow-400 text-3xl">Cevap</div>
              <div className="text-white mt-2">
                {selectedTest === "Tümü"
                  ? allQuestions[currentQuestionIndex].answer
                  : currentQuestion.answer}
              </div>
            </>
          ) : (
            <div className="min-h-[50px]"></div>
          )}
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handlePreviousQuestion}
          className="p-3 bg-green-700 text-white rounded-lg mt-1 hover:opacity-90"
        >
          Önceki
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="p-3 bg-yellow-500 w-full md:w-[600px] rounded-3xl mt-1 hover:opacity-90"
        >
          {showAnswer ? "Cevabı Gizle" : "Cevabı Göster"}
        </button>
        <button
          onClick={handleNextQuestion}
          className="p-3 bg-green-700 text-white rounded-lg mt-1 hover:opacity-90"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;