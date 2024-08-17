#!/usr/bin/env node

const apiClient = require('../utils/apiClient');

exports.fetchData = async (req, res) => {
    try {
        const response = await apiClient.get('/endpoint'); //  '/endpoint' for with your specific API endpoint
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch data' });
    }
};
