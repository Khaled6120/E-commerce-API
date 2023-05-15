const express = require("express")

const { getUsers, getUser, createUser, updateUser, deleteUser, uploadUserImage, resizeImage, changeUserPassword } = require("../services/userService")

const { createUserValidator, getUserValidator, deleteUserValidator, updateUserValidator, changeUserPasswordValidator } = require('../utils/validators/userValidator')
const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(AuthService.protect, AuthService.allowedTo("admin", 'manager'), getUsers)
    .post(AuthService.protect, AuthService.allowedTo("admin"), uploadUserImage, resizeImage, createUserValidator, createUser)
router
    .route("/:id")
    .get(AuthService.protect, AuthService.allowedTo("admin"), getUserValidator, getUser)
    .put(AuthService.protect, AuthService.allowedTo("admin"), uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(AuthService.protect, AuthService.allowedTo("admin"), deleteUserValidator, deleteUser)
router
    .put("/changePassword/:id", changeUserPasswordValidator, changeUserPassword)
module.exports = router