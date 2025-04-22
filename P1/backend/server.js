const express = require("express");
const path = require("path");
const connectDB = require("./config/dbConfig");

const app = express();

// Connect to MongoDB
connectDB();  // Calls the function from dbConfig.js

// Middleware: parse JSON bodies
app.use(express.json());

// Serve static files – for instance, your frontend files from the main folder
app.use(express.static(path.join(__dirname, "../")));

// API routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
