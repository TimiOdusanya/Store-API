require("dotenv").config();
require('express-async-errors');

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const productsRoute = require("./routes/products");

const port = process.env.PORT || 3000;

//Middleware
app.use(express.urlencoded({ extended: true }));

//To parse json
app.use(express.json());

//Routes
// app.use('/', )
app.use("/api/v1/products", productsRoute);

app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
