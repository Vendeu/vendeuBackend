const mongoose = require("mongoose")
const clientModel = require("../models/client")
mongoose.Promise = global.Promise

module.exports = {
    
    findAll: (req, res) => {
            clientModel.find({})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    findById: (req, res) => {
            clientModel.findById(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    create: (req, res) => {
            clientModel.create(req.body)
                .then((data) => res.status(201).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    update: (req, res) => {
            clientModel.update({_id : req.params.id}, req.body)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    remove: (req, res) => {
            clientModel.remove({_id : req.params.id})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    }
}