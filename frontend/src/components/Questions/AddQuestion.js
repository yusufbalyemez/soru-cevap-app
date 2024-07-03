import React, { useState, useEffect } from 'react';

const AddQuestion = () => {
  const [tests, setTests] = useState([]);
  const [selectedTestName, setSelectedTestName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newTestName, setNewTestName] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL; // .env dosyasındaki değişkeni burada kullanıyoruz

  useEffect(() => {
    // Test adlarını API'den çek
    const fetchTests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tests`);
        const data = await response.json();
        setTests(data);
        if (data.length > 0) {
          setSelectedTestName(data[0].testName);
        }
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, [apiUrl]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    console.log("Selected Test Adı:", selectedTestName);
    console.log("Test Soru:", question);
    console.log("Test Cevap:", answer);

    try {
      // Bulunan test indeksini bulmak için testleri alıyoruz
      const testsResponse = await fetch(`${apiUrl}/api/tests`);
      const tests = await testsResponse.json();
      const testIndex = tests.findIndex(test => test.testName === selectedTestName);

      console.log("Testler:", tests);
      console.log("Test Index:", testIndex);
      if (testIndex === -1) {
        alert('Test bulunamadı');
        return;
      }

      // Yeni soruyu belirlenen test indeksine ekliyoruz
      await fetch(`${apiUrl}/api/tests/${testIndex}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question, answer })
      });

      // Formu temizliyoruz
      setQuestion('');
      setAnswer('');
      alert('Soru başarıyla eklendi');
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Soru eklenirken bir hata oluştu');
    }
  };

  const handleAddTest = async (e) => {
    e.preventDefault();

    try {
      // Yeni testi ekliyoruz
      const response = await fetch(`${apiUrl}/api/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ testName: newTestName })
      });

      if (response.ok) {
        setNewTestName('');
        alert('Test başarıyla oluşturuldu');
        // Yeni test listesini güncelle
        const updatedTests = await response.json();
        setTests([...tests, updatedTests]);
      } else {
        alert('Test oluşturulurken bir hata oluştu');
      }
    } catch (error) {
      console.error('Error adding test:', error);
      alert('Test oluşturulurken bir hata oluştu');
    }
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
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Oluştur
        </button>
      </form>

      <h1 className="text-2xl mb-4 mt-10">Soru Ekle</h1>
      <form onSubmit={handleAddQuestion} className="flex flex-col space-y-4">
        <select
          value={selectedTestName}
          onChange={(e) => setSelectedTestName(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          {tests.map((test, index) => (
            <option key={index} value={test.testName}>
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