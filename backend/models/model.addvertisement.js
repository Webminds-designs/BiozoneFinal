// import mongoose from 'mongoose';

const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current date/time
  },
});

const Advertisement = mongoose.model("Advertisement", advertisementSchema);
// export default Advertisement;
module.exports = Advertisement;
