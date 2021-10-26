const express = require("express");
const productRoutes = require("./apis/products/routes");

const app = express();

// Middleware
app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
