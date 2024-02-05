const Category = require("../models/Category.js");
const express = require("express");
const router = express.Router();

//read : get-all categories
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
});

//create : add new categories
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("Succesfully added!");
  } catch (error) {
    res.status(400).json(error);
  }
});

// update: update categories
router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({_id: req.body.categoryId}, req.body)
    res.status(200).json("Succesfully updated!");
  } catch (error) {
    console.log(error);
  }
});

// delete: delete categories
router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({_id: req.body.categoryId}, req.body)
    res.status(200).json("Succesfully deleted!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
