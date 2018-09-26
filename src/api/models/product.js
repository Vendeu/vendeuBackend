const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
    name: {type: String},
    description: {type: String},
    additionalInfo: {type: String},
    price: {type: Number},
    img: {
        url: String,
        path: String,
        contentType: String
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('product', productSchema)