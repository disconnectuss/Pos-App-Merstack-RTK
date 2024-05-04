const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = 3000;

// routes   
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const invoiceRoute = require("./routes/invoices.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");


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
app.use("/api/categories", categoryRoute)
app.use("/api/products", productRoute)
app.use("/api/invoices", invoiceRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute);



app.listen(port, () => {
    connect()
    console.log(`example listening on port ${port}`)});
 