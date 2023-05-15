const express = require("express")

const { getCategories, createCategory, getCategory, updateCategory, deleteCategory, uploadCategoryImage, resizeImage } = require("../services/categoryService")
const { getCategoryValidator, deleteCategoryValidator, updateCategoryValidator, createCategoryValidator } = require("../utils/validators/categoryValidator")
const subcategoriesRoute = require("./subCategoryRoute")
const AuthService = require('../services/authService')

const router = express.Router()

router.use('/:categoryId/subcategories', subcategoriesRoute)


// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route('/')
    .get(getCategories)
    .post(AuthService.protect, AuthService.allowedTo("admin", "manager"), uploadCategoryImage, resizeImage, createCategoryValidator, createCategory);

router
    .route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(AuthService.protect, AuthService.allowedTo("admin", "manager"), updateCategoryValidator, updateCategory)
    .delete(AuthService.protect, AuthService.allowedTo("admin"), deleteCategoryValidator, deleteCategory)

module.exports = router