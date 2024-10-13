// Import required modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Everything is good here" });
});

// Mongoose connection
mongoose
  .connect(
    "mongodb+srv://mayurmaskar007:hbasRIjquwegs0ae@cluster0.qvsxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Not able to connect to database", error);
  });

// Middleware
app.use(express.json()); // Use Express's built-in body-parser

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authentication"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Routes
app.use("/v1/api", expenseRoutes);
app.use("/v1/api/user", userRoutes);
app.use(router);

// Export the app
module.exports = app;
