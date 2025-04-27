const express = require("express");
const path = require("path");
const connectDB = require("./config/dbConfig");

const app = express();

// mongoDB
connectDB();  // Calls the function from dbConfig.js
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));

// api routes -b
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
