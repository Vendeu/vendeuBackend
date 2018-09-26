const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
        streetNumber: {type: Number},
        complement: {type: String},
        district: {type: String, required: true},
        city: {type: String, require: true},
        state: {type: String, require: true},
        country: {type: String, require: true, default: "BRA"},
        zipCode: {type: String},
        cep: {type: Number, required: true},
        numberHouse: {type: Number, required: true}     
    }
})

module.exports = mongoose.model('client', clientSchema)