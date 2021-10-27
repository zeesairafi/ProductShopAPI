const express = require("express");
const {
  productListFetch,
  productCreate,
  productDelete,
  productUpdate,
} = require("./controllers");

// Create a mini express application
const router = express.Router();

router.post("/", productCreate);

router.get("/", productListFetch);

router.put("/:productId", productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;
