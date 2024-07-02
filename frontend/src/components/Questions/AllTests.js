import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllTests = () => {
  const [tests, setTests] = useState([]);

  // API'den test adlarını çekme
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tests');
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  // Test silme
  const handleDelete = async (index) => {
    try {
      await fetch(`http://localhost:3001/api/tests/${index}`, {
        method: 'DELETE',
      });
      setTests(tests.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-3">
      <h1 className="text-2xl mb-4">Tüm Testler</h1>
      <ul className="w-full md:w-1/2">
        {tests.map((test, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <Link to={`/tests/${index}`} className="text-blue-500 hover:underline">
              {test.testName}
            </Link>
            <div>
              <Link
                to={`/edit-test/${index}`}
                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
              >
                Düzenle
              </Link>
              <button
                onClick={() => handleDelete(index)}
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