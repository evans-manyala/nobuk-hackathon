const express = require("express");
const { getBusiness, createBusiness } = require("../controllers/business");

const router = express.Router()
router.get("/", getBusiness);
router.post("/", createBusiness);

module.exports = router