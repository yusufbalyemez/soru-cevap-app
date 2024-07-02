import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">Fat-App</div>
        <div className="space-x-4">
          <Link to="/testler" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Testler
          </Link>
          <Link to="/sorular" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Soru Sor
          </Link>
          <Link to="/soru-ekle" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Ekle
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;