const Invoice = require("../models/Invoice.js");
const express = require("express");
const router = express.Router();

//read : get-all invoices
router.get("/get-invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.log(error);
  }
});

//create : add new invoices
router.post("/add-invoice", async (req, res) => {
  try {
    console.log("Invoice data received:", req.body);
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    console.log("Invoice saved successfully:", newInvoice._id);
    res.status(200).json("Succesfully added!");
  } catch (error) {
    console.log("Invoice creation error:", error);
    res.status(400).json(error);
  }
});





module.exports = router;
