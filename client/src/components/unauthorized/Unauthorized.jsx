import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page. Please contact the administrator if you think this is a mistake.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
