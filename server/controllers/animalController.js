const Animal = require('../models/animalModel');

const cloudinary = require('cloudinary').v2;

exports.createAnimal = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.file);

    await Animal.create({
      animalName: req.body.animalName,
      categoryName: req.body.categoryName,
      file: result.secure_url,
    });

    return res.send({ message: 'Category created successfully' });
  } catch (error) {
    return res.send(error);
  }
};

exports.getAnimals = async (req, res) => {
  try {
    const allAnimal = await Animal.find({});

    return res.send({
      data: allAnimal,
    });
  } catch (error) {
    return res.send(error);
  }
};
