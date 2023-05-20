const express = require("express")

const { addAddress, getLoggedUserAddresses, removeAddress } = require("../services/addressService")
const AuthService = require('../services/authService')

const router = express.Router()




router
    .route("/")
    .post(AuthService.protect, AuthService.allowedTo("user"), addAddress)
    .get(AuthService.protect, AuthService.allowedTo("user"), getLoggedUserAddresses)
router.delete("/:addressId",
    AuthService.protect,
    AuthService.allowedTo("user"),
    removeAddress)


module.exports = router