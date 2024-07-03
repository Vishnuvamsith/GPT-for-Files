import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen">
      <ul>
        <li>
          <Link to="/pdf" className="block py-2 px-4 text-blue-500 hover:bg-blue-100">PDF</Link>
        </li>
        <li>
          <Link to="/excel" className="block py-2 px-4 text-blue-500 hover:bg-blue-100">Excel</Link>
        </li>
        <li>
          <Link to="/vision" className="block py-2 px-4 text-blue-500 hover:bg-blue-100">Vision</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
