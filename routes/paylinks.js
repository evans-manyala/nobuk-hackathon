const express = require("express");
const { getPaymentLinks, verifyPaymentLink, viewLinks } = require("../controllers/paylinks");

const router = express.Router()
router.get("/", getPaymentLinks);
router.post("/", verifyPaymentLink);
router.post("/:orgId", viewLinks);

module.exports = router;