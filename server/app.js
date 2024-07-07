
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
app.use(cors({ origin: '*' }));
app.use(fileUpload());

const excel = require('./routes/excel');
const pdf = require('./routes/pdf');
const vision = require('./routes/vision');
const ppt = require('./routes/ppt');
app.use("/excel", excel);
app.use("/pdf", pdf);
app.use("/vision", vision);
app.use('/ppt', ppt);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

