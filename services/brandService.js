const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require("uuid")
const sharp = require('sharp')

const Brand = require("../models/BrandModel")
const factory = require('./handlersFactory')


const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware')

//upload single image
exports.uploadBrandImage = uploadSingleImage('image')

//image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    // sharp is image processing library for nodejs it will take the image as a buffer and do some operations on it.
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/brands/${filename}`)

    //save to the DB
    req.body.image = filename

    next()
})



// @desc       Get list of brands
// @route      GET   /api/v1/brands
// @access     Public
exports.getBrands = factory.getAll(Brand)


// @desc       Get specific brand by id
// @route      GET   /api/v1/brands/:id
// @access     Public
exports.getBrand = factory.getOne(Brand)




// @desc       Create brand
// @route      POST   /api/v1/brands
// @access     private
exports.createBrand = factory.createOne(Brand)




// @desc       Update specific brand
// @route      PUT   /api/v1/brands/:id
// @access     private
exports.updateBrand = factory.updateOne(Brand)


// @desc       Delete specific brand
// @route      DELETE   /api/v1/brands/:id
// @access     private
exports.deleteBrand = factory.deleteOne(Brand)