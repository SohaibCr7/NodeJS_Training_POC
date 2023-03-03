const Product = require("../models/products");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.status(200).send({ products, pageTitle: "Shop", path: "/" });
    })
    .catch((error) => {
      res.status(200).send({ error, pageTitle: "Shop", path: "/" });
    });

  // .then(([rows, fieldData]) => {
  //   res.status(200).send({ rows, pageTitle: "Shop", path: "/" });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findAll({ where: { id: productId } })
    .then((products) => {
      res.status(200).send({
        products,
        pageTitle: "Product Details",
        path: "/shop/product-details",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Product.findByPk(productId)
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
};

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.status(200).send({ products, pageTitle: "Shop", path: "/shop/index" });
//   });
// };

exports.addToCart = (req, res, next) => {
  const { productId } = req.body;

  Product.fetchSingleProductById(productId, (product) => {
    const { price } = product[0];
    Cart.addProduct(productId, price);
    res.status(200).send({ message: "Product added successfully" });
  });
};

exports.getCart = (req, res, next) => {
  try {
    Cart.getCartProducts((cart) => {
      Product.fetchAll((products) => {
        // const cartProductMap = {};
        // cart.products.map((prod) => {
        //   cartProductMap[prod.id] = true
        // });
        // const product = products.filter((prod) => {
        //   return cartProductMap[prod.id];
        // });

        const cartProducts = [];
        products.map((allProducts) => {
          const cartData = cart.products.find(
            (prod) => prod.id === allProducts.id
          );

          if (cartData) {
            cartProducts.push({ ...allProducts, ...cartData });
          }
        });
        res.status(200).send({
          pageTitle: "Cart",
          path: "/shop/cart",
          cartProducts,
          totalPrice: cart.totalPrice,
        });
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCartProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    Product.fetchSingleProductById(prodId, (product) => {
      const { price } = product[0];
      // Delete Product work
      Cart.delete(prodId, price).then(() => {
        // Response after delete
        Cart.getCartProducts((cart) => {
          Product.fetchAll((products) => {
            const cartProducts = [];
            products.map((allProducts) => {
              const cartData = cart.products.find(
                (prod) => prod.id === allProducts.id
              );

              if (cartData) {
                cartProducts.push({ ...allProducts, ...cartData });
              }
            });
            res.status(200).send({
              pageTitle: "Cart",
              path: "/shop/cart",
              cartProducts,
              totalPrice: cart.totalPrice,
            });
          });
        });
      });
    });
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
};

exports.getOrders = (req, res, next) => {
  res.status(200).send({ pageTitle: "Your Orders", path: "/shop/orders" });
};

exports.getCheckout = (req, res, next) => {
  res.status(200).send({ pageTitle: "Checkout", path: "/shop/checkout" });
};
