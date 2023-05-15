const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const asynHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const User = require('../models/UserModel')


const createToken = (payload) =>
    jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    })



// @desc       Signup
// @route      PUT   /api/v1/auth/signup
// @access     public
exports.signup = asynHandler(async (req, res, next) => {
    // 1) create user
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    // 2) generate token
    const token = createToken(user._id)

    res.status(201).json({ data: user, token })
})

exports.login = asynHandler(async (req, res, next) => {
    // 1) check if password and email in the body
    const user = await User.findOne({ email: req.body.email })

    // 2) check if user exist and check if password is correct
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError("Incorrect email or password", 401))
    }
    // 3) generate token
    const token = createToken(user._id)
    // 4) send response to client side
    res.status(200).json({ data: user, token })
})

exports.protect = asynHandler(async (req, res, next) => {
    // 1) check if token exist, if so get it
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return next(new ApiError("You are not login, please login to get access this route"), 401)
    }

    // 2) verify token (no change happens, or the token has been expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    // decode : {
    // userId : 334345435342324,
    // iat : 154354354
    // exp : 154359643
    // }

    // 3) ckdck if user exists
    const currentUser = await User.findById(decoded.userId)
    if (!currentUser) {
        return next(new ApiError("the user that belong to this token no longer exist", 401))
    }

    // 4) check if user change his password after token created
    if (currentUser.passwordChangedAt) {
        const passChangedTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000, 10
        )
        // password changed after token created (error)
        if (passChangedTimestamp < decoded.iat) {
            return next(new ApiError("user recently changed his password, please login again..", 401))
        }
    }
    req.user = currentUser
    next()
})