"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = require("../models/products");

var Cart = require("../models/cart");

exports.getProducts = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.status(200).send({
      products: products,
      pageTitle: "Shop",
      path: "/"
    });
  })["catch"](function (error) {
    res.status(200).send({
      error: error,
      pageTitle: "Shop",
      path: "/"
    });
  }); // .then(([rows, fieldData]) => {
  //   res.status(200).send({ rows, pageTitle: "Shop", path: "/" });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

exports.getProductDetails = function (req, res, next) {
  var productId = req.params.productId;
  Product.findAll({
    where: {
      id: productId
    }
  }).then(function (products) {
    res.status(200).send({
      products: products,
      pageTitle: "Product Details",
      path: "/shop/product-details"
    });
  })["catch"](function (err) {
    console.log(err);
  }); // Product.findByPk(productId)
  //   .then((products) => {
  //     res.status(200).send({
  //       products,
  //       pageTitle: "Product Details",
  //       path: "/shop/product-details",
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ message: err });
  //   });
}; // exports.getIndex = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.status(200).send({ products, pageTitle: "Shop", path: "/shop/index" });
//   });
// };


exports.addToCart = function (req, res, next) {
  var productId = req.body.productId;
  Product.fetchSingleProductById(productId, function (product) {
    var price = product[0].price;
    Cart.addProduct(productId, price);
    res.status(200).send({
      message: "Product added successfully"
    });
  });
};

exports.getCart = function (req, res, next) {
  try {
    Cart.getCartProducts(function (cart) {
      Product.fetchAll(function (products) {
        // const cartProductMap = {};
        // cart.products.map((prod) => {
        //   cartProductMap[prod.id] = true
        // });
        // const product = products.filter((prod) => {
        //   return cartProductMap[prod.id];
        // });
        var cartProducts = [];
        products.map(function (allProducts) {
          var cartData = cart.products.find(function (prod) {
            return prod.id === allProducts.id;
          });

          if (cartData) {
            cartProducts.push(_objectSpread({}, allProducts, {}, cartData));
          }
        });
        res.status(200).send({
          pageTitle: "Cart",
          path: "/shop/cart",
          cartProducts: cartProducts,
          totalPrice: cart.totalPrice
        });
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCartProduct = function _callee(req, res, next) {
  var prodId;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            prodId = req.body.productId;
            Product.fetchSingleProductById(prodId, function (product) {
              var price = product[0].price; // Delete Product work

              Cart["delete"](prodId, price).then(function () {
                // Response after delete
                Cart.getCartProducts(function (cart) {
                  Product.fetchAll(function (products) {
                    var cartProducts = [];
                    products.map(function (allProducts) {
                      var cartData = cart.products.find(function (prod) {
                        return prod.id === allProducts.id;
                      });

                      if (cartData) {
                        cartProducts.push(_objectSpread({}, allProducts, {}, cartData));
                      }
                    });
                    res.status(200).send({
                      pageTitle: "Cart",
                      path: "/shop/cart",
                      cartProducts: cartProducts,
                      totalPrice: cart.totalPrice
                    });
                  });
                });
              });
            });
          } catch (err) {
            res.status(400).send({
              error: err
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getOrders = function (req, res, next) {
  res.status(200).send({
    pageTitle: "Your Orders",
    path: "/shop/orders"
  });
};

exports.getCheckout = function (req, res, next) {
  res.status(200).send({
    pageTitle: "Checkout",
    path: "/shop/checkout"
  });
};