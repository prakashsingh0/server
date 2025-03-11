const express = require('express');
const connectDB = require('./config/db');
const apiUrl = require('./routes/auth'); // Ensure this file correctly defines the login route
const cors = require('cors');
require('dotenv').config();

const app = express();

// Use Express built-in JSON parser (No need for body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Set up CORS
const allowedOrigins = [
  "http://localhost:8081",
  "http://192.168.53.161:8081"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDB();


app.use('/api/v2.0/route/user', apiUrl);


app.use((req, res, next) => {
  res.status(404).json({ error: "API route not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
