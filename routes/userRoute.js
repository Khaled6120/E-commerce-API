const express = require("express")

const { getUsers, getUser, createUser, updateUser, deleteUser, uploadUserImage, resizeImage, changeUserPassword } = require("../services/userService")

const { createUserValidator, getUserValidator, deleteUserValidator, updateUserValidator, changeUserPasswordValidator } = require('../utils/validators/userValidator')
const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(getUsers)
    .post(uploadUserImage, resizeImage, createUserValidator, createUser)
router
    .route("/:id")
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser)
router
    .put("/changePassword/:id", changeUserPasswordValidator, changeUserPassword)
module.exports = router