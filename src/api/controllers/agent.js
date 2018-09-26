const mongoose = require("mongoose")
const agentModel = require("../models/agent")
mongoose.Promise = global.Promise

module.exports = {
    
    findAll: (req, res) => {
            agentModel.find({})
                .populate('charmer')
                .exec((err, posted) => {
                    if(err) return res.status(500).json(err)

                    res.status(200).json(posted)
                })
    },
    
    findById: (req, res) => {
            agentModel.findById(req.params.id)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },

    findAllByCharmers: (req, res) => {
            agentModel.find({charmer: req.params.charmer})
                .populate('charmer')
                .exec((err, posted) => {
                    if(err) return res.status(500).json(err)
                        
                    res.status(200).json(posted)
                })
    },
    
    create: (req, res) => {
            agentModel.create(req.body)
                .then((data) => res.status(201).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    update: (req, res) => {
            agentModel.update({_id : req.params.id}, req.body)
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    },
    
    remove: (req, res) => {
            agentModel.remove({_id : req.params.id})
                .then((data) => res.status(200).json(data))
                .catch((err) => res.status(500).json(err))
    }
}