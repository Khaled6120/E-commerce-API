// User CRUD operations
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require("uuid")
const sharp = require('sharp')
const bcrypt = require('bcryptjs')

const User = require("../models/UserModel")
const factory = require('./handlersFactory')


const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware')
const ApiError = require('../utils/apiError')

//upload single image
exports.uploadUserImage = uploadSingleImage('profileImg')

//image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    // sharp is image processing library for nodejs it will take the image as a buffer and do some operations on it.
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`

    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/users/${filename}`)
        //save to the DB
        req.body.profileImg = filename
    }

    next()
})



// @desc       Get list of users
// @route      GET   /api/v1/users
// @access     private
exports.getUsers = factory.getAll(User)


// @desc       Get specific user by id
// @route      GET   /api/v1/users/:id
// @access     private
exports.getUser = factory.getOne(User)




// @desc       Create user
// @route      POST   /api/v1/users
// @access     private
exports.createUser = factory.createOne(User)




// @desc       Update specific user
// @route      PUT   /api/v1/user/:id
// @access     private
exports.updateUser = asyncHandler(async (req, res, next) => {

    const document = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            profileImg: req.body.profileImg,
            role: req.body.role
        },
        { new: true })

    if (!document) {
        return next(new ApiError(`No brand for this id ${req.params.id}`, 404))
    }
    res.status(200).json({ data: document })
})

// @desc       Update specific user password
// @route      PUT   /api/v1/user/:id
// @access     private

exports.changeUserPassword = asyncHandler(async (req, res, next) => {

    const document = await User.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now()
        },
        { new: true })

    if (!document) {
        return next(new ApiError(`No brand for this id ${req.params.id}`, 404))
    }
    res.status(200).json({ data: document })
})


// @desc       Delete specific user
// @route      DELETE   /api/v1/users/:id
// @access     private
exports.deleteUser = factory.deleteOne(User)