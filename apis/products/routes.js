const express = require("express");
const {
  productListFetch,
  productCreate,
  productDelete,
} = require("./controllers");

// Create a mini express application
const router = express.Router();

router.get("/", productListFetch);

router.post("/", productCreate);

router.delete("/:productId", productDelete);

module.exports = router;
