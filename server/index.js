const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDatabase = require('./database/db.js');
const Animal = require('./model/animalModel.js');
const app = express();

dotenv.config();
connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb' }));
const corsConfig = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: `${process.env.CLIENT_URL}`,
};
app.use(cors(corsConfig));

// Post to mongodb
app.post('/upload', async (req, res) => {
  console.log(req.body.file);
  try {
    await Animal.create({
      animalName: req.body.animalName,
      categoryName: req.body.categoryName,
      file: req.body.file,
    });

    return res.json({ message: 'Category Created Successfully' });
  } catch (error) {
    return res.json(error);
  }
});

// Get Data from MongoDB
app.get('/getAllData', async (req, res) => {
  try {
    await Animal.find({}).then((data) => res.send({ status: 200, data: data }));
  } catch (error) {
    return res.json(error);
  }
});

// Filter Data from MongoDB
app.post('/filter', async (req, res) => {
  try {
    await Animal.find({ categoryName: req.body.category }).then((data) =>
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
