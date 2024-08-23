const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({
      categoryName: req.body.categoryName,
    });

    return res.json({ message: 'Category created Successfully' });
  } catch (error) {
    return res.json(error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const allCategory = await Category.find({});

    return res.json({
      data: allCategory,
    });
  } catch (error) {
    return res.json(error);
  }
};
