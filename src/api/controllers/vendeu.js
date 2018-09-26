const mongoose = require("mongoose")
const vendeuModel = require("../models/vendeu")
mongoose.Promise = global.Promise

module.exports = {
    
    findAll: (req, res) => {
            vendeuModel.find({})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    findById: (req, res) => {
            vendeuModel.findById(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    create: (req, res) => {
            vendeuModel.create(req.body)
                .then((data) => res.status(201).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    update: (req, res) => {
            vendeuModel.update({_id : req.params.id}, req.body)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    remove: (req, res) => {
            vendeuModel.remove({_id : req.params.id})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    }
}