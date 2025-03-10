// import express from "express";
// import mongoose from "mongoose";
// import * as dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cors from "cors";
// import Routes from "./router/router.js";
// import adminRoutes from "./router/Adminroutes.js"; // Fixed path
// import emailRoutes from "./router/emailRoutes.js"; // Fixed path

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routes = require("./router/router");
const adminRoutes = require("./router/Adminroutes");
const emailRoutes = require("./router/emailRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.mongodbURL;

// CORS Configuration
const corsOptions = {
  origin: [
    "https://www.charithamunasinghe.lk",
    "https://charithamunasinghe.lk",
  ],
  // Allow only your frontend domain

  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions)); // Apply CORS options
app.use(bodyParser.json());

// Check for required environment variables
if (!MONGO_URL) {
  console.error("Missing environment variable: mongodbURL");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("App connected to database");

    // Start the server
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit process on database connection error
  });

// Define routes
app.use("/api/admin", Routes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/send-email", emailRoutes);

// Default error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
