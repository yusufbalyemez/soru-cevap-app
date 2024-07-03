import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TestDetails = () => {
  const { testIndex } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tests`);
        const data = await response.json();
        setTest(data[testIndex]);
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [testIndex]);

  const handleDeleteQuestion = async (questionIndex) => {
    try {
      await fetch(
        `http://localhost:3001/api/tests/${testIndex}/questions/${questionIndex}`,
        {
          method: "DELETE",
        }
      );
      setTest({
        ...test,
        questions: test.questions.filter((_, i) => i !== questionIndex),
      });
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-3">
      <h1 className="text-2xl mb-4">{test.testName}</h1>
      <ul className="w-full md:w-1/2">
        {test.questions.map((question, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <span className="flex flex-col">
              <span>{`S: ${question.question}`}</span>
              <span>{`C: ${question.answer}`}</span>
            </span>

            <button
              onClick={() => handleDeleteQuestion(index)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestDetails;
