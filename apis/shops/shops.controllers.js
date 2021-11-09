const Shop = require("../../db/models/Shop");
const Product = require("../../db/models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopListFetch = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("products");
    return res.json(shops);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    req.body.owner = req.user._id;
    const newShop = await Shop.create(req.body);
    await newShop.populate({
      path: "owner",
      select: "username",
    });
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

// req.user => logged in user from passport jwt
// req.shop => from param middleware
exports.productCreate = async (req, res, next) => {
  // check if the signed in user is the owner of this shop
  try {
    if (!req.user._id.equals(req.shop.owner._id)) {
      return next({
        status: 401,
        message: "You're not the owner!!!",
      });
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    req.body.shop = req.params.shopId;
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(req.shop, {
      $push: { products: newProduct._id },
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
