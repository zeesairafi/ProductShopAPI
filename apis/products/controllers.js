const products = require("../../products");

exports.productListFetch = (req, res) => {
  return res.json(products);
};

exports.productCreate = (req, res) => {
  products.push(req.body);
  return res.status(201).json(req.body);
};

exports.productDelete = (req, res) => {
  const productId = req.params.productId;
  const product = products.find((product) => product.id === +productId);
  if (product) {
    products = products.filter((product) => product.id !== +productId);
    return res.status(204).end();
  } else {
    return res.status(404).json({ message: "Product not found!" });
  }
};
