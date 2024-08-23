const express = require('express');
const { createAnimal, getAnimals } = require('../controllers/animalController');
const router = express.Router();

router.route('/create-animal').post(createAnimal);
router.route('/getAnimals').get(getAnimals);

module.exports = router;
