// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/dashboard';
import HomePage from './pages/home';
import PDFUploadPage from './pages/pdf';
import ExcelPage from './components/excel';
import VisionPage from './components/vision';
import NotFoundPage from './pages/notfound';
import PPTUploadPage from './pages/ppt';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/upload/pdf" element={<PDFUploadPage />} />
          <Route path="/upload/ppt" element={<PPTUploadPage/>} />
          <Route path="/upload/excel" element={<ExcelPage />} />
          <Route path="/upload/vision" element={<VisionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
