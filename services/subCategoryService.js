const SubCategory = require("../models/subCategoryModel")
const factory = require('./handlersFactory')


exports.setCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId
    next();
}

exports.createFilterObj = (req, res, next) => {
    let filterObject = {}
    if (req.params.categoryId) filterObject = { category: req.params.categoryId }
    req.filterObj = filterObject
    next()
}

// @desc       Get list of subcategories
// @route      GET   /api/v1/subcategories
// @access     Public
exports.createSubCategory = factory.createOne(SubCategory)



exports.getSubCategories = factory.getAll(SubCategory)


// @desc       Get specific Subcategory by id
// @route      GET   /api/v1/subcategories/:id
// @access     Public
exports.getSubCategory = factory.getOne(SubCategory)




// @desc       Update specific category
// @route      PUT   /api/v1/categories/:id
// @access     private
exports.updateSubCategory = factory.updateOne(SubCategory)


// @desc       Delete specific subcategory
// @route      DELETE   /api/v1/subcategories/:id
// @access     private
exports.deleteSubCategory = factory.deleteOne(SubCategory)
