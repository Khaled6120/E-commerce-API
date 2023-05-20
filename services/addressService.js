const asyncHandler = require('express-async-handler');


const User = require('../models/UserModel');

// @desc    Add Address to user address list 
// @route   POST /api/v1/addresses
// @access  Private/User

exports.addAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            // add address object to user addresses array
            $addToSet: { addresses: req.body },
        },
        { new: true });

    res.status(200).json({
        status: "success",
        message: "Address added succesfully",
        data: user.addresses
    })
})



// @desc    Remove address from user  addresses list
// @route   DELETE /api/v1/addresses/:addressId
// @access  protected/User

exports.removeAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            // remove address obj from user addresses array if address exist
            $pull: { addresses: { _id: req.params.addressId } },
        },
        { new: true });
    console.log(user)
    res.status(200).json({
        status: "success",
        message: "Address removed succesfully ",
        data: user.addresses
    })
})



// @desc    Get Addresses list
// @route   GET /api/v1/addresses
// @access  protected/User

exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('addresses')

    res.status(200).json({ status: 'success', results: user.addresses.length, data: user.addresses })
})
