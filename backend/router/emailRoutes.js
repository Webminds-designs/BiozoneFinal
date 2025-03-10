// import express from "express";
// import emailController from "../controllers/emailController.js";

const express = require("express");
const emailController = require("../controllers/emailController");

const router = express.Router();

router.post("/", emailController);

// export default router;
module.exports = router;
