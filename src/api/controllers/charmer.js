const mongoose = require("mongoose")
const charmerModel = require("../models/charmer")
mongoose.Promise = global.Promise

module.exports = {
    
    findAll: (req, res) => {
            charmerModel.find({})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    findById: (req, res) => {
            charmerModel.findById(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    create: (req, res) => {
            charmerModel.create(req.body)
                .then((data) => res.status(201).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    update: (req, res) => {
            charmerModel.update({_id : req.params.id}, req.body)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    remove: (req, res) => {
            charmerModel.remove({_id : req.params.id})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    }
}