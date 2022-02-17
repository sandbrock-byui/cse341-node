const fs = require('fs');
const path = require('../util/path');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(path.cartFilePath, (err, fileContent) => {
      // Fetch the previous cart
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + Number.parseFloat(productPrice);
      fs.writeFile(path.cartFilePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(path.cartFilePath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((product) => product.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      updatedCart.totalPrice -= productPrice * productQty;
      fs.writeFile(path.cartFilePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(path.cartFilePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
