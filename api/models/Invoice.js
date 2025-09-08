const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerTel: { type: String, required: true },
    cartItems: { type: Array, required: true },
    paymentMethod: { type: String, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);
const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
