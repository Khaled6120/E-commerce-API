const mongoose = require("mongoose")

// 1- create Schema
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'subCategory required'],
        unique: [true, 'subCategory must be unique'],
        minlength: [3, 'Too short subCategory name'],
        maxlength: [32, "Too long subCategory name"]
    },
    slug: {
        type: String,
        lowercase: true,
    },
    // Foregin Key to category schema
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, "Subcategory must be belong to parent category"]

    },


}, { timestamps: true })  // it will create createdAt & updatedAt fields

// 2- create model

const CategoryModel = mongoose.model('SubCategory', subCategorySchema)

module.exports = CategoryModel