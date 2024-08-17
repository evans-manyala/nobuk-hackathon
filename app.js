<<<<<<< HEAD
#!/usr/bin/env node
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json());
=======
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express()
const PORT = process.env.PORT || 5000

>>>>>>> 5bf6c06 (payments)
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));
<<<<<<< HEAD
// Routes
=======
>>>>>>> 5bf6c06 (payments)

const { connect_database } = require("./db/connect");
connect_database()

//
<<<<<<< HEAD
const authRoutes = require('./routes/auth');
const businessRoutes = require("./routes/business");
const payerDetailRoutes = require("./routes/payerdetails");
const paymentLinksRoutes = require("./routes/paylinks");
const paymentsRoutes = require("./routes/payments");
=======
const businessRoutes = require("./routes/business");
const payerDetailRoutes = require("./routes/payerdetails");
const paymentLinksRoutes = require("./routes/paylinks");
>>>>>>> 5bf6c06 (payments)

// Base Route
app.get("/", (req, res) => {
    res.send({ msg: "Server is running!!" }).status(200)
});

<<<<<<< HEAD
app.use('/auth', authRoutes);
app.use("/api/v0/business", businessRoutes)
app.use("/api/v0/payerdetails", payerDetailRoutes);
app.use("/api/v0/payment-links", paymentLinksRoutes);
app.use("/api/v0/payments", paymentsRoutes);

app.listen(PORT, () => {
    console.log(`The server is running on: http://localhost:${PORT}`)
})
=======
app.use("/api/v0/business", businessRoutes)
app.use("/api/v0/payerdetails", payerDetailRoutes);
app.use("/api/v0/payment-links", paymentLinksRoutes);

app.listen(PORT, () => {
    console.log(`The server is running on: http://localhost:${PORT}`)
})
>>>>>>> 5bf6c06 (payments)
