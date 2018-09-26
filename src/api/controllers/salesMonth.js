const mongoose = require("mongoose")
const salesMonthModel = require("../models/salesMonth")
const productModel = require("../models/product")
mongoose.Promise = global.Promise

module.exports = {
               
    findAll: (req, res) => {
          salesMonthModel.find({})
            .populate('product company agent')
            .exec((err, posted) => {
                if(err) throw err
                  salesMonthModel.aggregate({
                      $project: { total: "$value" }
                  }, {
                      $group: { _id: null, total: {$sum: "$total" }}
                  }, (err, result) => {
                      if (err) return res.status(500).json(err)
                      
                      salesMonthModel.count({}, (err, counted) => {
                          if(err) return res.status(500).json(err)
                          
                          res.json({
                              posted: posted,
                              total: result[0],
                              count: counted
                          })
                      })
                  })
                //res.json(posted)
            })
    },
    
    findAllByCompanies: (req, res) => {
        salesMonthModel.find({company: req.params.company})
            .populate('product company')
            .exec((err, posted) => {
                if (err) throw err
                salesMonthModel.aggregate({
                      $group: { _id: "$company", total: {$sum: "$value" }}
                  }, (err, result) => {
                      if (err) return res.status(500).json(err)
                      
                      salesMonthModel.count({company: req.params.company}, (err, counted) => {
                          if(err) return res.status(500).json(err)
                          
                          res.json({
                              posted: posted,
                              total: result[0],
                              count: counted
                          })
                      })
                  })
            })
    },
    
     findAllByAgents: (req, res) => {
        salesMonthModel.find({agent: req.params.agent})
            .populate('product agent')
            .exec((err, posted) => {
                if (err) throw err
                salesMonthModel.aggregate({
                      $group: { _id: "$agent", total: {$sum: "$value" }}
                  }, (err, result) => {
                      if (err) return res.status(500).json(err)
                      
                      salesMonthModel.count({agent: req.params.agent}, (err, counted) => {
                          if(err) return res.status(500).json(err)
                          
                          res.json({
                              posted: posted,
                              total: result[0],
                              count: counted
                          })
                      })
                  })
            })
    },
    
    findById: (req, res) => {
        productModel.findById({_id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    },
    
    create: (req, res) => {
        salesMonthModel.create(req.body)
            .then((data) => res.status(201).json(data))
            .catch((err) => res.status(500).json(err))
    },
    
    update: (req, res) => {
        salesMonthModel.update({_id: req.params.id}, req.body)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    },
    
    removeAll: (req, res) => {
        salesMonthModel.remove({})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    },
    
    remove: (req, res) => {
        salesMonthModel.remove({_id : req.params.id})
            .then(data => res.json(data))
            .catch(err => res.json(err))
    },
}