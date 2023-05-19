const express = require("express")

const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory, setCategoryIdToBody, createFilterObj } = require("../services/subCategoryService")
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require("../utils/validators/subcategoryValidator")
const { updateCategory } = require("../services/categoryService")
const AuthService = require('../services/authService')

// mergePaarams allow us to access parameters on other routers
// ex: we need to access category id from category router
const router = express.Router({ mergeParams: true })

router.route('/')
    .post(AuthService.protect, AuthService.allowedTo("admin", 'manager'), setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObj, getSubCategories)
router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(AuthService.protect, AuthService.allowedTo("admin", 'manager'), updateSubCategoryValidator, updateSubCategory)
    .delete(AuthService.protect, AuthService.allowedTo("admin"), deleteSubCategoryValidator, deleteSubCategory)
module.exports = router;