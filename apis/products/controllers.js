const products = require("../../products");
const Product = require("../../db/models/Product");
const { findByIdAndUpdate } = require("../../db/models/Product");

exports.productListFetch = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productUpdate = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productDelete = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete({ _id: productId });
    if (product) {
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create
// Status: 201
// Content: newly created item

// Retrieve (List && Detail)
// Status: 200
// Content: Requested data

// Update
// Status: 200
// Content: updated item

// Delete
// Status: 204
// Content: No Content
