const express = require('express');
const {
  createCategory,
  getCategories,
} = require('../controllers/categoryController');
const router = express.Router();

router.route('/create-category').post(createCategory);
router.route('/getAllCategory').get(getCategories);

module.exports = router;
