

const factory = require('./handlersFactory')
const Coupon = require('../models/couponModel')

// @desc       Get list of coupons
// @route      GET   /api/v1/coupons
// @access     private/ admin-manager
exports.getCoupons = factory.getAll(Coupon)


// @desc       Get specific Coupons by id
// @route      GET   /api/v1/coupons/:id
// @access     private/ admin-manager
exports.getCoupon = factory.getOne(Coupon)




// @desc       Create Coupon
// @route      POST   /api/v1/coupons
// @access     private/ admin-manager
exports.createCoupon = factory.createOne(Coupon)




// @desc       Update specific Coupon
// @route      PUT   /api/v1/coupons/:id
// @access     private/ admin-manager
exports.updateCoupon = factory.updateOne(Coupon)


// @desc       Delete specific Coupons
// @route      DELETE   /api/v1/coupons/:id
// @access     private/ admin-manager
exports.deleteCoupon = factory.deleteOne(Coupon)