import React, { useState } from 'react';

const AddTest = () => {
  const [testName, setTestName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Yeni testi ekliyoruz
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ testName })
      });

      if (response.ok) {
        setTestName('');
        alert('Test başarıyla oluşturuldu');
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
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
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
    </div>
  );
};

export default AddTest;