const fs = require('fs');
const path = require('../util/path');

const getProductsFromFile = (callback) => {
  const dbFilePath = path.dbFilePath;
  fs.readFile(dbFilePath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      const dbFilePath = path.dbFilePath;
      products.push(this);
      fs.writeFile(dbFilePath, JSON.stringify(products), err => {
        console.log(`Error saving products to file: ${err}`);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
