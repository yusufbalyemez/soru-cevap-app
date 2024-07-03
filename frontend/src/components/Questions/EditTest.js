import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTest = () => {
  const { testId } = useParams(); // useParams ile testId parametresini alıyoruz
  const [testName, setTestName] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTestDetails = async () => {
      if (!testId) { // testId'nin varlığını kontrol et
        console.error('Test ID is undefined');
        return;
      }
      try {
        const response = await fetch(`${apiUrl}/api/tests/${testId}`); // URL'de testId'yi kullanarak istek yap
        const data = await response.json();
        if (response.ok) {
          setTestName(data.testName);
        } else {
          throw new Error('Failed to fetch test details');
        }
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTestDetails();
  }, [testId, apiUrl]); // Bağımlılıkları testId ve apiUrl olarak güncelle

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testName) {
      alert("Test name is required.");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/tests/${testId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testName }),
      });
      if (response.ok) {
        alert('Test name updated successfully');
        navigate('/testler');
      } else {
        throw new Error('Failed to update test name');
      }
    } catch (error) {
      console.error('Error updating test name:', error);
      alert('Error updating test name');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-3">
      <h1 className="text-2xl mb-4">Test Adını Düzenle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Test Name"
          className="p-2 border border-gray-400 rounded min-w-[300px]"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default EditTest; 