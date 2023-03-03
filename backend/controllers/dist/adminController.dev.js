"use strict";

var Product = require("../models/products");

var delay = function delay(delayInterval) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, delayInterval);
  });
};

exports.getProducts = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.status(200).send({
      products: products,
      pageTitle: "Admin Products",
      path: "/"
    });
  })["catch"](function (error) {
    res.status(200).send({
      error: error,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

exports.getEditProducts = function (req, res, next) {
  var id = req.query.id;
  Product.findAll({
    where: {
      id: id
    }
  }).then(function (product) {
    if (!id) {
      return res.send({
        message: "Product not found"
      });
    }

    res.status(200).send({
      products: product,
      pageTitle: "Edit Product",
      path: "/admin/products",
      editing: id
    });
  })["catch"](function (error) {
    res.status(500).send({
      message: error
    });
  }); // Product.fetchSingleProductById(id, (product) => {
  //   if (!product) {
  //     res.send({ pageTitle: "Product not found" });
  //   }
  //   res.status(200).send({
  //     products: product,
  //     pageTitle: "Edit Product",
  //     path: "/admin/products",
  //     editing: id,
  //   });
  // });
};

exports.updateProduct = function (req, res, next) {
  try {
    var prodId = req.body.productData.id;
    var title = req.body.productData.title;
    var imageUrl = req.body.productData.imageUrl;
    var description = req.body.productData.description;
    var price = req.body.productData.price;
    Product.findByPk(prodId).then(function (product) {
      product.title = title, product.imageUrl = imageUrl, product.description = description, product.price = price;
      return product.save();
    }).then(function (result) {
      res.status(201).send({
        product: result,
        messsage: "Product updated successfully"
      });
    })["catch"](function (error) {
      res.status(401).send({
        message: error
      });
    }); // res.status(200).send({
    //   message: "Product Updated successfully",
    //   path: "/admin/products",
    // });
  } catch (error) {
    res.status(500).send({
      message: error
    });
  }
};

exports.postAddProduct = function (req, res, next) {
  var title = req.body.product.title;
  var imageUrl = req.body.product.imageUrl;
  var description = req.body.product.description;
  var price = req.body.product.price;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(function (result) {
    res.status(200).send();
    console.log("Product added into the products table");
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.deleteProduct = function (req, res, next) {
  var productId = req.body.id;
  Product.destroy({
    where: {
      id: productId
    }
  }).then(function (deletedRecord) {
    console.log(deletedRecord);

    if (deletedRecord === 1) {
      res.status(200).json({
        message: "Deleted successfully"
      });
    } else {
      res.status(404).json({
        message: "record not found"
      });
    }
  })["catch"](function (error) {
    res.status(500).json(error);
  });
};