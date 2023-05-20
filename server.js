const path = require('path');

const express = require('express')
const dotenv = require('dotenv')
const morgan = require("morgan")

dotenv.config({ path: 'config.env' })
const ApiError = require("./utils/apiError")
const bodyParser = require('body-parser');

const dbConnection = require("./config/database")

const globalError = require('./middlewares/errorMiddleware')

//routes
const categoryRoute = require("./routes/categoryRoute")
const subCategoryRoute = require("./routes/subCategoryRoute")
const brandRoute = require("./routes/brandRoute")
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const authRoute = require('./routes/authRoute')
const reviewRoute = require("./routes/reviewRoute")
const wishlistRoute = require("./routes/wishlistRoute")
const addressRoute = require("./routes/addressRoute")
const couponRoute = require("./routes/couponRoute")

dbConnection()
//express app
const app = express()
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//middlewares
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`⚠️ ⚠️  Mode: ${process.env.NODE_ENV} `)

}

// Routes 
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/subcategories", subCategoryRoute)
app.use("/api/v1/brands", brandRoute)
app.use("/api/v1/products", productRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/reviews", reviewRoute)
app.use("/api/v1/wishlist", wishlistRoute)
app.use("/api/v1/addresses", addressRoute)
app.use("/api/v1/coupons", couponRoute)


app.all('*', (req, res, next) => {
    //create error and send it to error handling middleware
    //   const error = new Error(`can't find this route ${req.originalUrl}`)
    //   next(err.message)
    next(new ApiError(`Cant find this route: ${req.originalUrl}`, 400))
})

//Glopal error handling middleware for express
app.use(globalError)







const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`⚡  App runining on port ${PORT} `)
})



// handle rejections outside express eg: database errors etc..
process.on('unhandledRejection', err => {
    console.error(`unhandledRejection errors ${err.name} | ${err.message}`)
    server.close(() => {
        console.error(`shutting down...`)
        process.exit(1)
    })
})