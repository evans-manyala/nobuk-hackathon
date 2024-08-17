const express = require("express");
const { getPayerDetails, createPayerDetail } = require("../controllers/payerdetails");

const router = express.Router()
router.get("/", getPayerDetails);
router.post("/", createPayerDetail);

module.exports = router