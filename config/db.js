#!/usr/bin/env node

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(); // Default database
    console.log("MongoDB Atlas connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectDB, getDB };
