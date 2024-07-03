// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { FiCopy } from 'react-icons/fi';
// import { FaShareAlt } from 'react-icons/fa';
// import jsPDF from 'jspdf';

// function PptUploader() {
//   const [question, setQuestion] = useState('');
//   const [file, setFile] = useState(null);
//   const [fileTitle, setFileTitle] = useState('');
//   const [responses, setResponses] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [copiedIndex, setCopiedIndex] = useState(null);
//   const lastResponseRef = useRef(null);

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);
//     setFileTitle(uploadedFile.name);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('question', question);

//       const response = await axios.post('http://localhost:5002/ppt/load', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setResponses((prevResponses) => [...prevResponses, { question, answer: response.data.response }]);
//       setQuestion('');
//     } catch (error) {
//       setError('An error occurred while processing your request.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (lastResponseRef.current) {
//       lastResponseRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [responses]);

//   const formatAnswer = (answer) => {
//     const parts = answer.split('*').filter(part => part.trim() !== '');
//     return parts.map((part, index) => (
//       <li key={index} className="mb-2">
//         {index === 0 ? <strong>{part.trim()}</strong> : part.trim()}
//       </li>
//     ));
//   };

//   const handleCopy = (index) => {
//     navigator.clipboard.writeText(responses[index].answer);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 3000);
//   };

//   const handleShare = () => {
//     const pdf = new jsPDF();
//     let yOffset = 10;

//     pdf.setFontSize(12);
//     responses.forEach((res, index) => {
//       pdf.text(`Q: ${res.question}`, 10, yOffset);
//       yOffset += 10;
//       const answers = res.answer.split('*').filter(part => part.trim() !== '');
//       answers.forEach((answer, idx) => {
//         const text = idx === 0 ? `A: ${answer.trim()}` : `   ${answer.trim()}`;
//         const splitText = pdf.splitTextToSize(text, 180); // Wrap text within the page width
//         pdf.text(splitText, 10, yOffset);
//         yOffset += (splitText.length * 10);
//       });
//       yOffset += 10;
//       if (yOffset > 270) { // Check if we need to add a new page
//         pdf.addPage();
//         yOffset = 10;
//       }
//     });
    
//     pdf.save('conversation.pdf');
//   };

//   return (
//     <div className="container mx-auto py-12 flex space-x-8">
//       <div className="w-1/3">
//         {fileTitle && (
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
//             <h1 className="text-2xl font-bold text-gray-800">{fileTitle}</h1>
//           </div>
//         )}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Presentation</h2>
//           <form className="flex flex-col space-y-4">
//             <input 
//               type="file" 
//               accept=".ppt, .pptx" 
//               onChange={handleFileChange} 
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {fileTitle && <p className="text-gray-600">{fileTitle}</p>}
//           </form>
//         </div>
//       </div>
//       <div className="w-2/3">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-4xl font-bold text-gray-800">Q&A Section</h1>
//           <button 
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={handleShare}
//           >
//             <FaShareAlt className="inline-block mr-2" />
//             Share
//           </button>
//         </div>
//         <div className="bg-white p-8 rounded-lg shadow-md">
//           <div className="max-h-96 overflow-y-auto p-4 border rounded" style={{ backgroundColor: "#f7fafc" }}>
//             {responses.map((res, index) => (
//               <div 
//                 key={index} 
//                 id={`response-card-${index}`} 
//                 className="mb-6 p-6 rounded-lg relative"
//                 ref={index === responses.length - 1 ? lastResponseRef : null}
//                 style={{ 
//                   backgroundColor: "linear-gradient(to bottom right, #f7fafc, #ffffff)", 
//                   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
//                   borderLeft: "4px solid #3182ce",
//                   position: "relative",
//                 }}
//               >
//                 {copiedIndex === index ? (
//                   <span className="absolute top-0 right-0 bg-blue-500 text-white p-1 text-sm rounded">Copied!</span>
//                 ) : (
//                   <button 
//                     className="absolute top-0 right-0 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
//                     onClick={() => handleCopy(index)}
//                   >
//                     <FiCopy className="inline-block mr-1" />
//                     Copy
//                   </button>
//                 )}
//                 <p className="text-lg font-semibold text-gray-800 mb-2"><strong>Q:</strong> {res.question}</p>
//                 <p className="text-gray-700"><strong>A:</strong></p>
//                 <ul className="list-disc text-gray-700">
//                   {formatAnswer(res.answer)}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6">
//             <input
//               type="text"
//               placeholder="Enter your question"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button 
//               type="submit" 
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//             >
//               {loading ? 'Loading...' : 'Submit'}
//             </button>
//           </form>
//           {loading && <div className="text-blue-500 mt-4">Loading...</div>}
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PptUploader;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiCopy } from 'react-icons/fi';
import { FaShareAlt } from 'react-icons/fa';
import jsPDF from 'jspdf';

function PptUploader() {
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState('');
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const lastResponseRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileTitle(uploadedFile.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('question', question);

      const response = await axios.post('http://localhost:5002/ppt/load', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newResponse = {
        question: question,
        text: response.data.text,
        links: response.data.links,
        images: response.data.images,
      };

      setResponses((prevResponses) => [...prevResponses, newResponse]);
      setQuestion('');
    } catch (error) {
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastResponseRef.current) {
      lastResponseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [responses]);

  const handleCopy = (index) => {
    navigator.clipboard.writeText(responses[index].text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

//   const handleCopy = (index) => {
//     navigator.clipboard.writeText(responses[index].answer);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 3000);
//   };

const handleShare = () => {
  const pdf = new jsPDF();
  let yOffset = 10;
  let currentPage = 1;

  pdf.setFontSize(14);

  responses.forEach((res, index) => {
    const term = `${index + 1}. ${res.question}`;
    const definition = res.text.replace(/\*\*/g, '').replace(/:/g, ': ');
    const textLines = pdf.splitTextToSize(definition, 180);

    // Check if adding the text will exceed the page height
    const lineHeight = 7; // Adjust this value based on your font size and line spacing
    const textHeight = textLines.length * lineHeight;
    
    // If adding the question will exceed the page height, go to the next page
    if (yOffset + textHeight + 20 > 270) { // Add extra padding for safety
      pdf.addPage();
      yOffset = 10;
      currentPage++;
    }

    // Add term
    pdf.text(term, 10, yOffset);
    yOffset += 10;

    // Add text lines
    textLines.forEach((line) => {
      pdf.text(line, 15, yOffset);
      yOffset += lineHeight;
    });

    yOffset += 10; // Add spacing between terms
  });

  pdf.save(`conversation_page${currentPage}.pdf`);
};





  
  
  

  const displayLinks = (links) => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Important Links to Refer:</h3>
      <ul className="list-disc list-inside ml-4">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  const displayImages = (images) => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Images:</h3>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Image ${index}`} className="w-32 h-32 mr-2 mb-2 object-cover rounded" />
        ))}
      </div>
    </div>
  );

  // const formatAnswer = (text) => {
  //   const points = text.split('**');
  //   if (points.length > 1) {
  //     return (
  //       <ul className="list-disc list-inside ml-4">
  //         {points.map((point, index) => (
  //           point.trim() !== '' && <li key={index}>{point.trim()}</li>
  //         ))}
  //       </ul>
  //     );
  //   }
  //   return <p>{text}</p>;
  // };
  const formatAnswer = (text) => {
    if (typeof text === 'object') {
      return JSON.stringify(text);
    }
  
    const points = text.split('\n').filter(line => line.trim() !== ''); // Split text into lines and filter out blank lines
    return (
      <ul className="list-disc list-inside ml-4">
        {points.map((point, index) => (
          <li key={index}>{point.trim()}</li>
        ))}
      </ul>
    );
  };
  
  

  return (
    <div className="container mx-auto py-12 flex space-x-8">
      <div className="w-1/3">
        {fileTitle && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{fileTitle}</h1>
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Presentation</h2>
          <form className="flex flex-col space-y-4">
            <input 
              type="file" 
              accept=".ppt, .pptx" 
              onChange={handleFileChange} 
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fileTitle && <p className="text-gray-600">{fileTitle}</p>}
          </form>
        </div>
      </div>
      <div className="w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800">Q&A Section</h1>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleShare}
          >
            <FaShareAlt className="inline-block mr-2" />
            Share
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="max-h-96 overflow-y-auto p-4 border rounded" style={{ backgroundColor: "#f7fafc" }}>
            {responses.map((res, index) => (
              <div 
                key={index} 
                id={`response-card-${index}`} 
                className="mb-6 p-6 rounded-lg relative"
                ref={index === responses.length - 1 ? lastResponseRef : null}
                style={{ 
                  backgroundColor: "#ffffff", 
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
                  borderLeft: "4px solid #3182ce",
                  position: "relative",
                }}
              >
                {copiedIndex === index ? (
                  <span className="absolute top-0 right-0 bg-blue-500 text-white p-1 text-sm rounded">Copied!</span>
                ) : (
                  <button 
                    className="absolute top-0 right-0 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => handleCopy(index)}
                  >
                    <FiCopy className="inline-block mr-1" />
                    Copy
                  </button>
                )}
                <p className="text-lg font-semibold text-gray-800 mb-2"><strong>Q:</strong> {res.question}</p>
                <div className="text-gray-700"><strong>A:</strong> {formatAnswer(res.text)}</div>
                {res.links && res.links.length > 0 && displayLinks(res.links.slice(0, 3))}
                {res.images && res.images.length > 0 && displayImages(res.images.slice(0, 3))}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6">
            <input
              type="text"
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
          {loading && <div className="text-blue-500 mt-4">Loading...</div>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default PptUploader;



  
             




























