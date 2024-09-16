const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const Busboy = require('busboy');
const router = express.Router();


router.post('/load', async (req, res) => {
  try {
    const question = req.body.query;
    const files = req.files.file;

    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append('file', file.data, file.name);
      });
    } else {
      formData.append('file', files.data, files.name);
    }

    // Adding question as a field
    formData.append('query', question);

    const response = await axios.post('http://localhost:5009/api/excel', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    console.log('Response from backend:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;