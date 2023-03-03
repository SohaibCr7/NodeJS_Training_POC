const path = require("path");
const express = require("express");

const productsController = require("../controllers/shopController");

const router = express.Router();

// get Products and routes will be shop/products
// router.get("/", productsController.getIndex);

router.get("/products", productsController.getProducts);

router.get('/product-details/:productId', productsController.getProductDetails)

router.get("/cart", productsController.getCart);

router.post('/cart-delete-item', productsController.deleteCartProduct)

router.post('/add-cart', productsController.addToCart)

router.get("/checkout", productsController.getCheckout);

module.exports = router;
