const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const { connectDatabase } = require('./database/db.js');
const Animal = require('./models/animalModel.js');
const Category = require('./models/categoryModel.js');
const animalRoute = require('./routes/animalRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
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

app.use('', animalRoute);
app.use('', categoryRoute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
