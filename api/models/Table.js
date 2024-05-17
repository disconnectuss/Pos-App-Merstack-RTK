const mongoose = require("mongoose");

const TableSchema = mongoose.Schema(
  { 
    title: { type: String, require: true },
    number: { type: String, require: true },
    people: { type: Number, require: true },
    status: { type: String, require: true },
  },
  { timestamps: true }
);
const Table = mongoose.model("Table", TableSchema);
module.exports = Table;
