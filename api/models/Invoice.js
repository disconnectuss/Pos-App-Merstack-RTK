const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    custmonerTel: { type: String, require: true },
    cartItems: { type: Array, require: true },
    payment: { type: String, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  { timestamps: true }
);
const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
