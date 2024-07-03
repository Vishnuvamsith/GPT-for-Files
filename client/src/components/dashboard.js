
// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // function DashboardLayout({ children }) {
// //   return (
// //     <div className="flex h-screen">
// //       {/* Sidebar */}
// //       <div className="bg-gray-800 text-white w-64 flex flex-col">
// //         <div className="text-xl font-semibold px-6 py-4 border-b border-gray-700">Dashboard</div>
// //         <ul className="flex-grow">
// //           <li>
// //             <Link to="/" className="block px-6 py-3 hover:bg-gray-700">Home</Link>
// //           </li>
// //           <li>
// //             <Link to="/upload" className="block px-6 py-3 hover:bg-gray-700">Upload</Link>
// //           </li>
// //         </ul>
// //         <div className="px-6 py-4 border-t border-gray-700">
// //           <p>&copy; 2024 My Website</p>
// //         </div>
// //       </div>

// //       {/* Content Area */}
// //       <div className="flex-1 flex flex-col">
// //         {/* Header */}
// //         <header className="bg-white shadow p-4">
// //           <h1 className="text-2xl font-semibold">My Application</h1>
// //         </header>

// //         {/* Main Content */}
// //         <main className="flex-1 bg-gray-200 p-10 overflow-y-auto">
// //           {children}
// //         </main>

// //         {/* Footer */}
// //         <footer className="bg-white shadow p-4">
// //           <p>Footer content goes here</p>
// //         </footer>
// //       </div>
// //     </div>
// //   );
// // }

// // export default DashboardLayout;
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// function DashboardLayout({ children }) {
//   const location = useLocation();
//   const [isUploadMenuOpen, setUploadMenuOpen] = useState(location.pathname.startsWith('/upload'));

//   const toggleUploadMenu = () => {
//     setUploadMenuOpen(!isUploadMenuOpen);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-gray-800 text-white w-64 flex flex-col">
//         <div className="text-xl font-semibold px-6 py-4 border-b border-gray-700">Dashboard</div>
//         <ul className="flex-grow">
//           <li>
//             <Link to="/" className="block px-6 py-3 hover:bg-gray-700">Home</Link>
//           </li>
//           <li>
//             <button onClick={toggleUploadMenu} className="w-full text-left block px-6 py-3 hover:bg-gray-700">
//               Upload
//             </button>
//             {isUploadMenuOpen && (
//               <ul className="pl-4">
//                 <li>
//                   <Link to="/upload/pdf" className="block px-6 py-3 hover:bg-gray-700">PDF Upload</Link>
//                 </li>
//                 <li>
//                   <Link to="/upload/ppt" className="block px-6 py-3 hover:bg-gray-700">PPT Upload</Link>
//                 </li>
//                 <li>
//                   <Link to="/upload/excel" className="block px-6 py-3 hover:bg-gray-700">Excel Upload</Link>
//                 </li>
//                 <li>
//                   <Link to="/upload/vision" className="block px-6 py-3 hover:bg-gray-700">Vision Upload</Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         </ul>
//         <div className="px-6 py-4 border-t border-gray-700">
//           <p>&copy; 2024 My Website</p>
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white shadow p-4">
//           <h1 className="text-2xl font-semibold">My Application</h1>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 bg-gray-200 p-10 overflow-y-auto">
//           {children}
//         </main>

//         {/* Footer */}
//         <footer className="bg-white shadow p-4">
//           <p>Footer content goes here</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function DashboardLayout({ children }) {
  const location = useLocation();
  const [isUploadMenuOpen, setUploadMenuOpen] = useState(location.pathname.startsWith('/upload'));

  const toggleUploadMenu = () => {
    setUploadMenuOpen(!isUploadMenuOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-blue-500 text-white w-64 flex flex-col">
        <div className="text-xl font-semibold px-6 py-4 border-b border-blue-600">Dashboard</div>
        <ul className="flex-grow">
          <li>
            <Link to="/" className="block px-6 py-3 hover:bg-blue-600">Home</Link>
          </li>
          <li>
            <button onClick={toggleUploadMenu} className="w-full text-left block px-6 py-3 hover:bg-blue-600">
              Upload
            </button>
            {isUploadMenuOpen && (
              <ul className="pl-4">
                <li>
                  <Link to="/upload/pdf" className="block px-6 py-3 hover:bg-blue-600">PDF Upload</Link>
                </li>
                <li>
                  <Link to="/upload/ppt" className="block px-6 py-3 hover:bg-blue-600">PPT Upload</Link>
                </li>
                <li>
                  <Link to="/upload/excel" className="block px-6 py-3 hover:bg-blue-600">Excel Upload</Link>
                </li>
                <li>
                  <Link to="/upload/vision" className="block px-6 py-3 hover:bg-blue-600">Vision Upload</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow p-4">
          <h1 className="text-2xl font-semibold text-white">My Application</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-200 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;






