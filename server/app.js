// const express = require("express");
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { google } = require('googleapis');
// const app = express();
// const fileUpload = require('express-fileupload');
// const PORT = process.env.PORT || 5002;
// app.use(express.json({ limit: "50mb" }));
// const cors = require("cors");
// const corsOptions = {
//   origin: 'http://localhost:3000', // Allow requests from this origin
//   optionsSuccessStatus: 200, // Some legacy browsers choke on 204
// };

// app.use(cors(corsOptions));
// app.use(fileUpload());
// const excel=require('./routes/excel')
// const pdf=require('./routes/pdf')
// const vision=require('./routes/vision')
// const ppt=require('./routes/ppt')
// //const drive=require('./routes/drive')
// app.use("/excel",excel)
// app.use("/pdf",pdf)
// app.use("/vision",vision)
// app.use('/ppt',ppt)
// const upload = multer({ dest: 'uploads/' });

// const CLIENT_ID = '952348443059-mfhh2ha20uf7k1och8m0ket7i6v0f4pm.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const REDIRECT_URI = 'http://localhost:5002/oauth2callback';

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// app.get('/auth/google', (req, res) => {
//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   res.redirect(authUrl);
// });

// app.get('/oauth2callback', (req, res) => {
//   const code = req.query.code;
//   oauth2Client.getToken(code, (err, token) => {
//     if (err) {
//       return res.status(500).send('Error retrieving access token');
//     }
//     oauth2Client.setCredentials(token);
//     res.redirect(`/drive-upload?token=${JSON.stringify(token)}`);
//   });
// });

// app.post('/upload-pdf', upload.single('file'), async (req, res) => {
//   const { token } = req.body;
//   const oauth2ClientWithToken = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
//   );
//   oauth2ClientWithToken.setCredentials(JSON.parse(token));

//   const drive = google.drive({ version: 'v3', auth: oauth2ClientWithToken });

//   const filePath = path.join(__dirname, req.file.path);
//   const fileName = req.file.originalname;

//   try {
//     const response = await drive.files.create({
//       requestBody: {
//         name: fileName,
//         mimeType: 'application/pdf',
//       },
//       media: {
//         mimeType: 'application/pdf',
//         body: fs.createReadStream(filePath),
//       },
//     });

//     // Clean up the uploaded file
//     fs.unlinkSync(filePath);

//     res.json({ fileId: response.data.id });
//   } catch (error) {
//     console.error('Error uploading file to Google Drive:', error);
//     res.status(500).send('Error uploading file to Google Drive');
//   }
// });
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');
const app = express();
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 5002;
app.use(express.json({ limit: "50mb" }));
const cors = require("cors");

// Reordered middleware to ensure CORS is applied before route definitions
app.use(cors({ origin: '*' })); // Allow requests from any origin during development
app.use(fileUpload());

const excel = require('./routes/excel');
const pdf = require('./routes/pdf');
const vision = require('./routes/vision');
const ppt = require('./routes/ppt');
// const drive = require('./routes/drive');
app.use("/excel", excel);
app.use("/pdf", pdf);
app.use("/vision", vision);
app.use('/ppt', ppt);
const upload = multer({ dest: 'uploads/' });

const CLIENT_ID = '952348443059-mfhh2ha20uf7k1och8m0ket7i6v0f4pm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:5002/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Disable CORS for the /auth/google route
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', (req, res) => {
  const code = req.query.code;
  console.log('Received authorization code:', code); // Debugging statement

  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error('Error retrieving access token:', err); // Debugging statement
      return res.status(500).send('Error retrieving access token');
    }

    console.log('Received token:', token); // Debugging statement
    oauth2Client.setCredentials(token);
    res.redirect(`/drive-upload?token=${JSON.stringify(token)}`);
  });
});


app.post('/upload-pdf', upload.single('file'), async (req, res) => {
  const { token } = req.body;
  const oauth2ClientWithToken = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oauth2ClientWithToken.setCredentials(JSON.parse(token));

  const drive = google.drive({ version: 'v3', auth: oauth2ClientWithToken });

  const filePath = path.join(__dirname, req.file.path);
  const fileName = req.file.originalname;

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'application/pdf',
      },
      media: {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath),
      },
    });

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res.json({ fileId: response.data.id });
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    res.status(500).send('Error uploading file to Google Drive');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

