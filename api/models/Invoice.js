const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    customerName: { type: String, require: true },
    customerTel: { type: String, require: true },
    cartItems: { type: Array, require: true },
    paymentMethod: { type: String, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  { timestamps: true }
);
const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
