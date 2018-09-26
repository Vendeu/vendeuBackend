const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salesMonthSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    date: {type: Date, default: Date.now},
    value: {type: Number}
})

module.exports = mongoose.model('sales', salesMonthSchema)