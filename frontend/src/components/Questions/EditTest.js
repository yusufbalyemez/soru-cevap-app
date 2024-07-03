import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTest = () => {
  const { testIndex } = useParams();
  const [testName, setTestName] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL; // .env dosyasındaki değişkeni burada kullanıyoruz

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tests`);
        const data = await response.json();
        setTestName(data[testIndex].testName);
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };

    fetchTestDetails();
  }, [testIndex, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/tests/${testIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testName }),
      });
      if (response.ok) {
        navigate('/testler');
      } else {
        console.error('Failed to update test name');
      }
    } catch (error) {
      console.error('Error updating test name:', error);
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