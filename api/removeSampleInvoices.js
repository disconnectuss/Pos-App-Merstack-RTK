const mongoose = require("mongoose");
const Invoice = require("./models/Invoice.js");
require("dotenv").config();

const removeSampleInvoices = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Remove sample invoices (the ones from seed data)
    // These are identifiable by their customer names
    const sampleCustomers = [
      "John Smith",
      "Sarah Johnson", 
      "Mike Wilson",
      "Emma Davis",
      "David Brown"
    ];

    const result = await Invoice.deleteMany({
      customerName: { $in: sampleCustomers }
    });

    console.log(`Removed ${result.deletedCount} sample invoices`);
    
    // Show remaining invoices
    const remainingInvoices = await Invoice.find({});
    console.log(`\nRemaining invoices: ${remainingInvoices.length}`);
    
    if (remainingInvoices.length > 0) {
      console.log("\nYour invoices:");
      remainingInvoices.forEach((invoice, index) => {
        console.log(`${index + 1}. ${invoice.customerName} - $${invoice.totalAmount} (${invoice.paymentMethod})`);
      });
    } else {
      console.log("No invoices remaining. Create some new ones!");
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
};

removeSampleInvoices();
