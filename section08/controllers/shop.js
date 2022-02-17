const Product = require('../models/product');

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getIndex = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render('shop/index', {
      path: '/',
      pageTitle: 'Shop',
      products: products
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders'
  });};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render('shop/product-list', {
      path: '/',
      pageTitle: 'All Products',
      products: products
    });
  });
};
