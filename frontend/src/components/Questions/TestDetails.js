import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const TestDetails = () => {
  const { testId } = useParams(); // testIndex yerine testId kullan
  const [test, setTest] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL; // .env dosyasındaki değişkeni burada kullanıyoruz
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tests/${testId}`);
        const data = await response.json();
        setTest(data);
      } catch (error) {
        console.error("Error fetching test details:", error);
      } finally {
        setLoading(false); // Yüklenme tamamlandığında loading state'ini false yap
      }
    };

    fetchTestDetails();
  }, [testId, apiUrl]);

  // Veriler yüklenmeden önceki durum
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
        <span className="mt-4">Yükleniyor...</span>
      </div>
    );
  }

  const handleDeleteQuestion = async (questionId) => {
    try {
      await fetch(`${apiUrl}/api/tests/${testId}/questions/${questionId}`, {
        method: "DELETE",
      });
      setTest({
        ...test,
        questions: test.questions.filter((q) => q._id !== questionId),
      });
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-3 mt-16">
      <h1 className="text-2xl mb-4">{test.testName}</h1>
      <ul className="w-full md:w-1/2">
        {test.questions.map((question) => (
          <li
            key={question._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span className="flex flex-col">
              <span>{`S: ${question.question}`}</span>
              <span>{`C: ${question.answer}`}</span>
            </span>

            <button
              onClick={() => handleDeleteQuestion(question._id)}
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
