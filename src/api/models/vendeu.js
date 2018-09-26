const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const passwordHash = (v) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(v, salt)
    return hash
}


const vendeuSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        set: passwordHash
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['VENDEU'],
        default: 'VENDEU'
    }
    
})

module.exports = mongoose.model('vendeu', vendeuSchema)
