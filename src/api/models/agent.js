const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const passwordHash = (v) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(v, salt)
    return hash
}

const agentSchema = new Schema({
    charmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "charmer"
    },
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
    cpf: {
        type: Number,
        required: true
    },
    cnpj: {
        type: Number
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: [{
        type: Number,
        required: true
    }],
    address: {
        street: {type: String, required: true},
        district: {type: String, required: true},
        cep: {type: Number, required: true},
        numberHouse: {type: Number, required: true},
        complement: {type: String},
    },
    bankData: {
        accountNumber: {type: Number, required: true},
        agency: {type: Number, required: true}
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['ENCANTADOR'],
        default: 'ENCANTADOR'
    }
})

module.exports = mongoose.model('agent', agentSchema)