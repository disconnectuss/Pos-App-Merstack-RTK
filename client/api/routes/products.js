const Product = require("../models/Product.js");
const router =require("express").Router();

//read : get-all products
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

//create : add new products
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Succesfully added!");
  } catch (error) {
    res.status(400).json(error);
  }
});

// update: update products
router.put("/update-product", async (req, res) => {
  try {
    await Product.findOneAndUpdate({_id: req.body.productId}, req.body)
    res.status(200).json("Succesfully updated!");
  } catch (error) {
    console.log(error);
  }
});

// delete: delete products
router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findOneAndDelete({_id: req.body.productId}, req.body)
    res.status(200).json("Succesfully deleted!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
