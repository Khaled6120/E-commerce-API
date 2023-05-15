const express = require("express")

const { getBrands, createBrand, getBrand, updateBrand, deleteBrand, uploadBrandImage, resizeImage } = require("../services/brandService")
const { getBrandValidator, deleteBrandValidator, updateBrandValidator, createBrandValidator } = require("../utils/validators/brandValidator")
const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(getBrands)
    .post(AuthService.protect, AuthService.allowedTo("admin", 'manager'), uploadBrandImage, resizeImage, createBrandValidator, createBrand)
router
    .route("/:id")
    .get(getBrandValidator, getBrand)
    .put(AuthService.protect, AuthService.allowedTo("admin", "manager"), uploadBrandImage, resizeImage, updateBrandValidator, updateBrand)
    .delete(AuthService.protect, AuthService.allowedTo("admin"), deleteBrandValidator, deleteBrand)
module.exports = router