#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL, // Set this in your .env file
    headers: {
        'Content-Type': 'application/json',
        // Add any other necessary headers here
    },
});

module.exports = apiClient;
