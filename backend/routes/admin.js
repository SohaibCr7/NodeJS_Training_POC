const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

// These all routes include /admin at the begning of every routes because we have set the defaul /admin in the server file on this route

// E.g: admin/products for GET products for admin panel
router.get("/products", adminController.getProducts);

// E.g: admin/add-products for POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product", adminController.getEditProducts);

router.put("/edit-product", adminController.updateProduct);

router.post("/delete-product", adminController.deleteProduct);

module.exports = router;
