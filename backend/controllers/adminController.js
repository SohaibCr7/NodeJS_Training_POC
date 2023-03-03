const Product = require("../models/products");

const delay = (delayInterval) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayInterval);
  });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res
        .status(200)
        .send({ products, pageTitle: "Admin Products", path: "/" });
    })
    .catch((error) => {
      res.status(200).send({ error, pageTitle: "Shop", path: "/" });
    });
};

exports.getEditProducts = (req, res, next) => {
  const { id } = req.query;

  Product.findAll({ where: { id: id } })
    .then((product) => {
      if (!id) {
        return res.send({ message: "Product not found" });
      }
      res.status(200).send({
        products: product,
        pageTitle: "Edit Product",
        path: "/admin/products",
        editing: id,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error });
    });
  // Product.fetchSingleProductById(id, (product) => {
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

exports.updateProduct = (req, res, next) => {
  try {
    const prodId = req.body.productData.id;
    const title = req.body.productData.title;
    const imageUrl = req.body.productData.imageUrl;
    const description = req.body.productData.description;
    const price = req.body.productData.price;
    Product.findByPk(prodId)
      .then((product) => {
        (product.title = title),
          (product.imageUrl = imageUrl),
          (product.description = description),
          (product.price = price);
        return product.save();
      })
      .then((result) => {
        res.status(201).send({
          product: result,
          messsage: "Product updated successfully",
        });
      })
      .catch((error) => {
        res.status(401).send({ message: error });
      });
    // res.status(200).send({
    //   message: "Product Updated successfully",
    //   path: "/admin/products",
    // });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.product.title;
  const imageUrl = req.body.product.imageUrl;
  const description = req.body.product.description;
  const price = req.body.product.price;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      res.status(200).send();
      console.log("Product added into the products table");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.id;

  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then((deletedRecord) => {
      console.log(deletedRecord);
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
};
