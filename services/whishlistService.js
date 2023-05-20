const asyncHandler = require('express-async-handler');


const ApiError = require('../utils/apiError');
const User = require('../models/UserModel');

// @desc    Add product to wishlist 
// @route   POST /api/v1/wishlist
// @access  Private/User

exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            // add product id to wishlist array if prodouct not exist
            $addToSet: { wishlist: req.body.productId },
        },
        { new: true });
    console.log(user)
    res.status(200).json({
        status: "success",
        message: "Product added succesfully to your wishlist",
        data: user.wishlist
    })
})



// @desc    Remove product to wishlist 
// @route   DELETE /api/v1/wishlist/:id
// @access  Private/User

exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            // remove product id from wishlist array if prodouct exist
            $pull: { wishlist: req.params.productId },
        },
        { new: true });
    console.log(user)
    res.status(200).json({
        status: "success",
        message: "Product removed succesfully from your wishlist",
        data: user.wishlist
    })
})