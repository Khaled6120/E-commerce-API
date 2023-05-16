const express = require("express")

const { signup, login, forgotPassword, passwordResetVerified, resetPassword } = require("../services/authService")

const { signupValidator, loginValidator } = require('../utils/validators/authValidator')
const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/signup")
    .post(signupValidator, signup)

router
    .route("/login")
    .post(loginValidator, login)
router
    .route("/forgotPassword")
    .post(forgotPassword)
router
    .route("/verifyResetCode")
    .post(passwordResetVerified)
router
    .route("/resetPassword")
    .put(resetPassword)
passwordResetVerified
/*router
    .route("/:id")
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser)
*/

module.exports = router