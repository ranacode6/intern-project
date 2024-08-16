const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const connectDatabase = require('./database/db.js');
const Animal = require('./model/animalModel.js');
const app = express();

dotenv.config();
connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, '../client/public');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    return cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Post to mongodb
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    await Animal.create({
      animalName: req.body.animalName,
      categoryName: req.body.categoryName,
      file: req.file.filename,
    });

    return res.send('message: Created Successfully');
  } catch (error) {
    return res.json(error);
  }
});

// Get Data from MongoDB
app.get('/getAllData', async (req, res) => {
  const category = req.params.category;
  try {
    await Animal.find({ categoryName: category }).then((data) =>
      res.send({ status: 200, data: data })
    );
  } catch (error) {
    return res.json(error);
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
