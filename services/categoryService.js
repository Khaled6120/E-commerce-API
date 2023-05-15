const CategoryModel = require("../models/CategoryModel")
const factory = require('./handlersFactory')
const { v4: uuidv4 } = require("uuid")
const sharp = require('sharp')
const asyncHandler = require('express-async-handler')
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware')


exports.uploadCategoryImage = uploadSingleImage('image')


exports.resizeImage = asyncHandler(async (req, res, next) => {
    // sharp is image processing library for nodejs it will take the image as a buffer and do some operations on it.
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/categories/${filename}`)

    //save to the DB
    req.body.image = filename

    next()
})


// @desc       Get list of categories
// @route      GET   /api/v1/categories
// @access     Public
exports.getCategories = factory.getAll(CategoryModel)


// @desc       Get specific category by id
// @route      GET   /api/v1/categories/:id
// @access     Public
exports.getCategory = factory.getOne(CategoryModel)




// @desc       Create category
// @route      POST   /api/v1/categories
// @access     private
exports.createCategory = factory.createOne(CategoryModel)



// @desc       Update specific category
// @route      PUT   /api/v1/categories/:id
// @access     private
exports.updateCategory = factory.updateOne(CategoryModel)


// @desc       Delete specific category
// @route      DELETE   /api/v1/categories/:id
// @access     private
exports.deleteCategory = factory.deleteOne(CategoryModel)