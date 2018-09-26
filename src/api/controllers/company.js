const mongoose = require("mongoose")
const companyModel = require("../models/company")
mongoose.Promise = global.Promise

module.exports = {
    
    findAll: (req, res) => {
            companyModel.find({})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    findById: (req, res) => {
            companyModel.findById(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    create: (req, res) => {
            companyModel.create(req.body)
                .then((data) => res.status(201).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    update: (req, res) => {
            companyModel.update({_id : req.params.id}, req.body)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    remove: (req, res) => {
            companyModel.remove({_id : req.params.id})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    }
}