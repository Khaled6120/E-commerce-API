const express = require("express")

const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, uploadProductImages, resizeProductImages } = require("../services/productService")
const { createProductValidator, updateProductValidator, deleteProductValidator, getProductValidator } = require("../utils/validators/productValidator")
const AuthService = require('../services/authService')
const reviewsRoute = require("./reviewRoute")
const router = express.Router()



router.use("/:productId/reviews", reviewsRoute)

// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(getProducts)
    .post(AuthService.protect, AuthService.allowedTo("admin", 'manager'),
        uploadProductImages,
        resizeProductImages,
        createProductValidator,
        createProduct)
router
    .route("/:id")
    .get(getProductValidator, getProduct)
    .put(AuthService.protect, AuthService.allowedTo("admin", 'manager'),
        uploadProductImages,
        resizeProductImages,
        updateProductValidator,
        updateProduct)
    .delete(AuthService.protect, AuthService.allowedTo("admin"), deleteProductValidator, deleteProduct)
module.exports = router