// import express from "express";
// import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// export default router;
module.exports = router;
