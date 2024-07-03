

// import React from 'react';
// import { Link } from 'react-router-dom';
// import pdfImage from '../assets/pdf.png'; // Import PDF image
// import excelImage from '../assets/excel.png'; // Import Excel image
// import visionImage from '../assets/vision.png'; // Import Vision image
// import pptImage from '../assets/ppt.png'; // Import PPT image

// function Home() {
//   const services = [
//     { name: 'PDF Upload', path: '/upload/pdf', description: 'Upload and process PDF files', image: pdfImage },
//     { name: 'Excel Processing', path: '/upload/excel', description: 'Upload and process Excel files', image: excelImage },
//     { name: 'Vision Processing', path: '/upload/vision', description: 'Image and Vision processing services', image: visionImage },
//     { name: 'PPT Upload', path: '/upload/ppt', description: 'Upload and process PPT files', image: pptImage },
//   ];

//   return (
//     <div className="container mx-auto py-12">
//       <h1 className="text-4xl font-bold mb-8 text-center">Services We Offer</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {services.map((service, index) => (
//           <Link to={service.path} key={index} className="block">
//             <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 relative group">
//               <img src={service.image} alt={service.name} className="w-full h-24 md:h-32 object-cover" />
//               <div className="p-4 opacity-0 absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white transition-opacity duration-300 group-hover:opacity-100">
//                 <h2 className="text-lg font-semibold">{service.name}</h2>
//                 <p className="text-sm">{service.description}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import pdfImage from '../assets/pdf.png'; // Import PDF image
import excelImage from '../assets/excel.png'; // Import Excel image
import visionImage from '../assets/vision.png'; // Import Vision image
import pptImage from '../assets/ppt.png'; // Import PPT image

function Home() {
  const services = [
    { name: 'PDF Upload', path: '/upload/pdf', description: 'Upload and process PDF files', image: pdfImage },
    { name: 'Excel Processing', path: '/upload/excel', description: 'Upload and process Excel files', image: excelImage },
    { name: 'Vision Processing', path: '/upload/vision', description: 'Image and Vision processing services', image: visionImage },
    { name: 'PPT Upload', path: '/upload/ppt', description: 'Upload and process PPT files', image: pptImage },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-5xl font-bold mb-8 text-center text-white py-4 rounded-lg bg-gradient-to-r from-purple-700 to-pink-600 shadow-lg">Discover Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Link to={service.path} key={index} className="block">
            <div className="relative rounded-xl overflow-hidden transform transition-transform hover:scale-105">
              <img src={service.image} alt={service.name} className="w-full h-40 md:h-56 object-cover shadow-lg rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold text-black mb-2">{service.name}</h2>
                <p className="text-lg text-black hover:text-white">{service.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;




















