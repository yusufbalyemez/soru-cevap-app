import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllTests = () => {
  const [tests, setTests] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL; // .env dosyasındaki değişkeni burada kullanıyoruz

  // API'den test adlarını çekme
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tests`);
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, [apiUrl]);

  // Test silme
  const handleDelete = async (testId) => {
    try {
      await fetch(`${apiUrl}/api/tests/${testId}`, {
        method: 'DELETE',
      });
      // Sadece silinen testi listeden çıkarma
      setTests(tests.filter(test => test._id !== testId));
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-3">
      <h1 className="text-2xl mb-4">Tüm Testler</h1>
      <ul className="w-full md:w-1/2">
        {tests.map((test) => (
          <li key={test._id} className="flex justify-between items-center border-b py-2">
            <Link to={`/tests/${test._id}`} className="text-blue-500 hover:underline">
              {test.testName}
            </Link>
            <div>
              <Link
                to={`/edit-test/${test._id}`}
                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
              >
                Düzenle
              </Link>
              <button
                onClick={() => handleDelete(test._id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTests;