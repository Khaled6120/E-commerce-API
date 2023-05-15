const express = require("express")

const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, uploadProductImages, resizeProductImages } = require("../services/productService")
const { createProductValidator, updateProductValidator, deleteProductValidator, getProductValidator } = require("../utils/validators/productValidator")

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(getProducts)
    .post(uploadProductImages,
        resizeProductImages,
        createProductValidator,
        createProduct)
router
    .route("/:id")
    .get(getProductValidator, getProduct)
    .put(uploadProductImages,
        resizeProductImages,
        updateProductValidator,
        updateProduct)
    .delete(deleteProductValidator, deleteProduct)
module.exports = router