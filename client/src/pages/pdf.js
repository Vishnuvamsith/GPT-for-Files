

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiCopy } from 'react-icons/fi'; // Import FiCopy icon from react-icons

function PptUploader() {
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState('');
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null); // State to track copied 
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

      const response = await axios.post('http://localhost:5002/pdf/load', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponses((prevResponses) => [...prevResponses, { question, answer: response.data.response }]);
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

  const formatAnswer = (answer) => {
    const parts = answer.split('*').filter(part => part.trim() !== '');
    return parts.map((part, index) => (
      <li key={index} className="mb-2">
        {index === 0 ? <strong>{part.trim()}</strong> : part.trim()}
      </li>
    ));
  };

  const handleCopy = (index) => {
    navigator.clipboard.writeText(responses[index].answer); // Copy conversation text to clipboard
    setCopiedIndex(index); // Set copied index to display "Copied!" message
    setTimeout(() => setCopiedIndex(null), 3000); // Hide "Copied!" message after 3 seconds
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
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Q&A Section</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="max-h-96 overflow-y-auto p-4 border rounded" style={{ backgroundColor: "#f7fafc" }}>
            {responses.map((res, index) => (
              <div 
                key={index} 
                className="mb-6 p-6 rounded-lg relative" // Add relative positioning
                ref={index === responses.length - 1 ? lastResponseRef : null}
                style={{ 
                  backgroundColor: "linear-gradient(to bottom right, #f7fafc, #ffffff)", 
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
                  borderLeft: "4px solid #3182ce",
                  position: "relative", // Ensure positioning context for absolute positioning
                }}
              >
                {copiedIndex === index ? ( // Render "Copied!" message if index matches copiedIndex
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
                <p className="text-gray-700"><strong>A:</strong></p>
                <ul className="list-disc text-gray-700">
                  {formatAnswer(res.answer)}
                </ul>
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





















