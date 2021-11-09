const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  shopListFetch,
  shopCreate,
  fetchShop,
  productCreate,
} = require("./shops.controllers");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "Shop Not Found!" });
  }
});
router.get("/", shopListFetch);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);

router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

module.exports = router;
