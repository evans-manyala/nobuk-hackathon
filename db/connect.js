const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/nobuk";

const connect_database = async () => {
  await mongoose
    .connect(connectionString)
    .then(() => console.log("Database connected Successfully"))
    .catch((error) => console.log(error));
};


module.exports = { connect_database }