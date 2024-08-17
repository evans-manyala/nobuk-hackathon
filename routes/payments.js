const express = require("express");
const { makePayment } = require("../controllers/makePayment");

const router = express.Router()
router.post("/", makePayment)

module.exports = router