const Table = require("../models/Table.js");
const router =require("express").Router();

//read : get-all tables
router.get("/get-all", async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    console.log(error);
  }
});

//create : add new table
router.post("/add-table", async (req, res) => {
  try {
    const newTable = new Table(req.body);
    await newTable.save();
    res.status(200).json("Succesfully added!");
  } catch (error) {
    res.status(400).json(error);
  }
});

// update: update tables
router.put("/update-table", async (req, res) => {
  try {
    await Table.findOneAndUpdate({_id: req.body.tableId}, req.body)
    res.status(200).json("Succesfully updated!");
  } catch (error) {
    console.log(error);
  }
});

// delete: delete tables
router.delete("/delete-table", async (req, res) => {
  try {
    await Table.findOneAndDelete({_id: req.body.tableId}, req.body)
    res.status(200).json("Succesfully deleted!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;