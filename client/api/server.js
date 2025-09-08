const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 3000;

// routes   
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const invoiceRoute = require("./routes/invoices.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const tableRoute = require("./routes/table.js");

dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongodb server")
  } catch (error) {
    throw error;
  }
};

//middleware routes
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.get("/", (req, res) => {
  res.status(200).send({
    status: 200,
    message: "Server is running"
  })
});
app.use("/api/categories", categoryRoute)
app.use("/api/products", productRoute)
app.use("/api/invoices", invoiceRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute);
app.use("/api/tables", tableRoute);



app.listen(port, () => {
    connect()
    console.log(`example listening on port ${port}`)});
 