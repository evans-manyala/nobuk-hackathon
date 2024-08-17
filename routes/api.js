#!/usr/bin/env node

const express = require('express');
const { fetchData } = require('../controllers/apiController');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/data', protect, fetchData);

module.exports = router;
