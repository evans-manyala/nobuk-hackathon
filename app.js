#!/usr/bin/env node
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));
// Routes

const { connect_database } = require("./db/connect");
connect_database()

//
const authRoutes = require('./routes/auth');
const businessRoutes = require("./routes/business");
const payerDetailRoutes = require("./routes/payerdetails");
const paymentLinksRoutes = require("./routes/paylinks");
const paymentsRoutes = require("./routes/payments");

// Base Route
app.get("/", (req, res) => {
    res.send({ msg: "Server is running!!" }).status(200)
});

app.use('/auth', authRoutes);
app.use("/api/v0/business", businessRoutes)
app.use("/api/v0/payerdetails", payerDetailRoutes);
app.use("/api/v0/payment-links", paymentLinksRoutes);
app.use("/api/v0/payments", paymentsRoutes);

app.listen(PORT, () => {
    console.log(`The server is running on: http://localhost:${PORT}`)
})
