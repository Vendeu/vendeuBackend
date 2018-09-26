const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const passwordHash = (v) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(v, salt)
    return hash
}

const companySchema = new Schema({
    email: {
       type: String,
       required: true,
       unique: true
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
    cnpj: {
        type: Number,
        required: true
    },
    phone: [{
        type: Number,
        required: true
    }],
    stateRegistration: {
        type: Number,
    },
    address: {
        street: {type: String, required: true},
        district: {type: String, required: true},
        cep: {type: Number, required: true},
        numberHouse: {type: Number, required: true},
        complement: {type: String}
    },
    bankData: {
        accountNumber: {type: Number, required: true},
        agency: {type: Number, required: true},
        name: {type: String, required: true},
        cpf: {type: Number, required: true},
        cnpj: {type: Number}
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['EMPRESA'],
        default: 'EMPRESA'
    }
})

module.exports = mongoose.model('company', companySchema)
