const Invoice = require("../models/Invoice.js");
const express = require("express");
const router = express.Router();

//read : get-all invoices
router.get("/get-invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json(error);
  }
});

//create : add new invoices
router.post("/add-invoice", async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(200).json("Succesfully added!");
  } catch (error) {
    res.status(400).json(error);
  }
});





module.exports = router;
