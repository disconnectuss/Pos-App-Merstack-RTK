const mongoose = require("mongoose");

const TableSchema = mongoose.Schema(
  {
    part: { type: String, require: true },
    people: { type: Number, require: true },
    status: { type: String, require: true },
  },
  { timestamps: true }
);
const Table = mongoose.model("Table", TableSchema);
module.exports = Table;
