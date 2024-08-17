#!/usr/bin/env node

const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');
require('dotenv').config();

const db = getDB();

const protect = async (req, res, next) => {
  let token;

  // Check if token is provided in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally retrieve user details from MongoDB if needed
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new require('mongodb').ObjectId(decoded.id) });
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

module.exports = protect;
