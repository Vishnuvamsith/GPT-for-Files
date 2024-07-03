const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router();

router.post('/load', async (req, res) => {
  try {
    const question = req.body.question;
    const files = req.files.file;

    const formData = new FormData();

    // Adding files to formData
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append('file', file.data, file.name);
      });
    } else {
      formData.append('file', files.data, files.name);
    }

    // Adding question as a field
    formData.append('question', question);

    const response = await axios.post('http://localhost:5000/api/pdf', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
