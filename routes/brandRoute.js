const express = require("express")

const { getBrands, createBrand, getBrand, updateBrand, deleteBrand, uploadBrandImage, resizeImage } = require("../services/brandService")
const { getBrandValidator, deleteBrandValidator, updateBrandValidator, createBrandValidator } = require("../utils/validators/brandValidator")

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(getBrands)
    .post(uploadBrandImage, resizeImage, createBrandValidator, createBrand)
router
    .route("/:id")
    .get(getBrandValidator, getBrand)
    .put(uploadBrandImage, resizeImage, updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand)
module.exports = router