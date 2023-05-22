const express = require("express")

const { getCoupon, getCoupons, createCoupon, updateCoupon, deleteCoupon } = require("../services/couponService")
const AuthService = require('../services/authService')

const router = express.Router()



// will be applied for all routers
router.use(AuthService.protect, AuthService.allowedTo("admin", 'manager'))

router
    .route("/")
    .get(getCoupons)
    .post(createCoupon)
router
    .route("/:id")
    .get(getCoupon)
    .put(updateCoupon)
    .delete(deleteCoupon)

module.exports = router



