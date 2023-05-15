const mongoose = require("mongoose")

// 1- create Schema
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique: [true, 'Brand must be unique'],
        minlength: [3, 'Too short Brand nama'],
        maxlength: [32, "Too long Brand name"]
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,

}, { timestamps: true })

const setImageURL = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`
        doc.image = imageUrl
    }
}

// find all, find id, update by id handlers
BrandSchema.post('init', (doc) => {
    setImageURL(doc)
})
// create handler
BrandSchema.post('save', (doc) => {
    setImageURL(doc)
})

// 2- create model

const BrandModel = mongoose.model('Brand', BrandSchema)

module.exports = BrandModel