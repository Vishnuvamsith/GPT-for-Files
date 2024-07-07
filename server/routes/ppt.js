const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const Busboy = require('busboy');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({
  key: "AIzaSyBR_A6TRv4mmI0I_nm5PSC8CAeiDC5CSYk", // Replace with your Google Cloud API key
});

router.post('/audio', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });

  // Array to store files to send to Flask
  const filesToUpload = [];

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.join(__dirname, 'uploads', filename);
    const writeStream = fs.createWriteStream(saveTo);
    file.pipe(writeStream);

    file.on('end', () => {
      console.log(`File ${filename} saved`);
      filesToUpload.push({
        fieldname: fieldname,
        originalname: filename,
        encoding: encoding,
        mimetype: mimetype,
        path: saveTo,
      });
    });
  });

  busboy.on('finish', async () => {
    console.log('File upload finished');

    // Prepare FormData to send to Flask
    const formData = new FormData();
    filesToUpload.forEach((file) => {
      formData.append(file.fieldname, fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });

    try {
      // Send files to Flask server
      const response = await axios.post('http://localhost:5000/ppt/audio', formData, {
        headers: formData.getHeaders(),
      });

      console.log('Response from Flask:', response.data);
      res.status(200).json({ message: 'File uploaded successfully to Flask' });
    } catch (error) {
      console.error('Error uploading files to Flask:', error.message);
      res.status(500).json({ error: 'Failed to upload files to Flask' });
    }
  });

  // Pipe request to Busboy
  req.pipe(busboy);
});



// router.post('/load', async (req, res) => {
//   try {
//     const question = req.body.question;
//     const files = req.files.file;

//     const formData = new FormData();

//     // Adding files to formData
//     if (Array.isArray(files)) {
//       files.forEach((file) => {
//         formData.append('file', file.data, file.name);
//       });
//     } else {
//       formData.append('file', files.data, files.name);
//     }

//     // Adding question as a field
//     formData.append('question', question);

//     const response = await axios.post('http://localhost:5000/api/ppt', formData, {
//       headers: {
//         ...formData.getHeaders(),
//       },
//     });
//     console.log('Response from backend:', response.data);

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });
router.post('/load',async (req, res) => {
  try {
    const question = req.body.question;
    const files = req.files.file;

    // Detect language and translate if necessary
    let translatedQuestion = question;
    const [detection] = await translate.detect(question);

    if (detection.language !== 'en') {
      console.log(`Detected language: ${detection.language}`);
      const [translation] = await translate.translate(question, 'en');
      translatedQuestion = translation;
      console.log(`Translated question: ${translatedQuestion}`);
    }

    const formData = new FormData();

    // Adding files to formData
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append('file', file.data, file.name);
      });
    } else {
      formData.append('file', files.data, files.name);
    }

    // Adding translated question as a field
    formData.append('question', translatedQuestion);

    // Forwarding the request to the backend
    const response = await axios.post('http://localhost:5000/api/ppt', formData, {
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