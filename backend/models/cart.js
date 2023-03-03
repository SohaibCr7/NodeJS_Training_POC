const fs = require("fs");
const path = require("path");

const dirPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static getCartProducts(cb) {
    fs.readFile(dirPath, (error, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (error) {
        cb([]);
      } else {
        cb(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    // Fetch the exesting products
    fs.readFile(dirPath, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
      }
      // Analyze cart => exesting products
      const exestingProductsIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const exestingProduct = cart.products[exestingProductsIndex];
      let updatedProduct;
      // Add new product/ increased the quantity
      if (exestingProduct) {
        updatedProduct = { ...exestingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[exestingProductsIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(dirPath, JSON.stringify(cart, null, 4), (err) => {
        console.log(err);
      });
    });
  }

  static delete (id, productPrice, cb) {
    return new Promise((resolve, reject) => {

    fs.readFile(dirPath, (error, fileContent) => {
      if (error) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };

      const product = updatedCart.products.find((prod) => prod.id === id);

      if (!product) {
        return;
      }

      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(dirPath, JSON.stringify(updatedCart, null, 4), (err) => {
          if (err) {
            console.log(err)
            reject(false);
          } else {
            resolve(true);
          }
          
        })
    });
  });
  }
};
