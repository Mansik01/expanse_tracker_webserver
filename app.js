const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mayurmaskar007:hbasRIjquwegs0ae@cluster0.qvsxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Not able to connect to database");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,authentication"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use("/v1/api", expenseRoutes);
app.use("/v1/api/USER", userRoutes);

module.exports = app;
