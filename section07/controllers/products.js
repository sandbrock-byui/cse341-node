const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render('shop', {
      path: '/',
      pageTitle: 'Shop',
      products: products,
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};