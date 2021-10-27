const express = require("express");
const productRoutes = require("./apis/products/routes");
const connectDB = require("./db/database");

const app = express();

// Middleware
app.use(express.json());
app.use("/api/products", productRoutes);

connectDB();

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
