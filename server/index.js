const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const connectDatabase = require('./database/db.js');
const Animal = require('./model/animalModel.js');
const Category = require('./model/categoryModel.js');
const app = express();

dotenv.config();
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: '20mb' }));
const corsConfig = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: `${process.env.CLIENT_URL}`,
};
app.use(cors(corsConfig));

// Post to mongodb
app.post('/create-animal', async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.file);
    await Animal.create({
      animalName: req.body.animalName,
      categoryName: req.body.categoryName,
      file: result.secure_url,
    });

    return res.json({ message: 'Category Created Successfully' });
  } catch (error) {
    return res.json(error);
  }
});

app.post('/create-category', async (req, res) => {
  try {
    const newCateogry = await Category.create({
      categoryName: req.body.categoryName,
    });

    return res.send({ message: 'Category Created', newCategory: newCateogry });
  } catch (error) {
    return res.send(error);
  }
});

// Get Data from MongoDB
app.get('/getAllData', async (req, res) => {
  try {
    const allData = await Animal.find({});

    return res.send({ data: allData });
  } catch (error) {
    return res.json(error);
  }
});

// Get All Category from MongoDB
app.get('/getAllCategory', async (req, res) => {
  try {
    const allCategory = await Category.find({});
    return res.send({ data: allCategory });
  } catch (error) {
    return res.json(error);
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
