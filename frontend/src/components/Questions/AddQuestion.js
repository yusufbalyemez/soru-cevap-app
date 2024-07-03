import React, { useState, useEffect } from "react";

const AddQuestion = () => {
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newTestName, setNewTestName] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL; // .env dosyasındaki değişkeni burada kullanıyoruz

  useEffect(() => {
    // Test adlarını API'den çek
    const fetchTests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tests`);
        const data = await response.json();
        setTests(data);
        if (data.length > 0) {
          setSelectedTestId(data[0]._id); // Varsayılan olarak ilk testin ID'sini seçili hale getiriyor
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [apiUrl]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!selectedTestId) {
      alert("Please select a test first.");
      return;
    }

    // Yeni soruyu belirlenen test ID'sine ekliyoruz
    await fetch(`${apiUrl}/api/tests/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ testId: selectedTestId, question, answer }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Soru başarıyla eklendi");
        setQuestion("");
        setAnswer("");
      })
      .catch((error) => {
        console.error("Error adding question:", error);
        alert("Soru eklenirken bir hata oluştu");
      });
  };

  const handleAddTest = async (e) => {
    e.preventDefault();
    // Yeni testi ekliyoruz
    await fetch(`${apiUrl}/api/tests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ testName: newTestName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewTestName("");
        alert("Test başarıyla oluşturuldu");
        setTests([...tests, data]); // Yeni testi listeye ekliyoruz
        setSelectedTestId(data._id); // Yeni oluşturulan testi seçili yap
      })
      .catch((error) => {
        console.error("Error adding test:", error);
        alert("Test oluşturulurken bir hata oluştu");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-3">
      <h1 className="text-2xl mb-4">Yeni Test Oluştur</h1>
      <form onSubmit={handleAddTest} className="flex flex-col space-y-4">
        <input
          type="text"
          value={newTestName}
          onChange={(e) => setNewTestName(e.target.value)}
          placeholder="Test Adı"
          className="p-2 border border-gray-400 rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue"
        >
          Oluştur
        </button>
      </form>
      <h1 className="text-2xl mb-4 mt-10">Soru Ekle</h1>
      <form onSubmit={handleAddQuestion} className="flex flex-col space-y-4">
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          {tests.map((test) => (
            <option key={test._id} value={test._id}>
              {test.testName}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="p-2 border border-gray-400 rounded"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          className="p-2 border border-gray-400 rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Ekle
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
