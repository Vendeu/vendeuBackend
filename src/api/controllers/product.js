const mongoose = require("mongoose")
const companyModel = require("../models/company")
const productModel = require("../models/product")
const fs = require('fs')
const cloudinary = require('cloudinary')
mongoose.Promise = global.Promise

cloudinary.config({ 
  cloud_name: 'ddtdxeaxl', 
  api_key: '961647835262185', 
  api_secret: 'EFTk-0Dm_rPAOTxcLBgGAGcPJ-0' 
});

module.exports = {
               
    findAll: (req, res) => {
          productModel.find({})
            .populate('postedBy')
            .exec((err, posted) => {
                if(err) return res.status(500).json(err)
                  
                res.status(200).json(posted)
            })
    },
    
    findById: (req, res) => {
        productModel.findById({_id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    },
    
    findAllByCompanies: (req, res) => {
        productModel.find({postedBy: req.params.postedBy})
            .populate('postedBy')
            .exec((err, posted) => {
                if (err) return res.status(500).json(err)
                
                res.status(200).json(posted)
            })
    },
    
    createProduct: (req, res) => {
      const product = new productModel({
            postedBy: req.body.postedBy,
            name: req.body.name,
            description: req.body.description,
            additionalInfo: req.body.additionalInfo,
            price: req.body.price,
            img: {
                 url: '',
                 path: '',
                 contentType: ''
             },
            active: res.body.active
        })
        
        product.save((err, data) => {
            if (err) return res.status(500).json(err)
            
            res.status(200).json(data)
        })
    },
    
    insertImg: (req, res) => {
        productModel.findOne({_id: req.params.id})
            .then(img => {
                var photo = img
                
                cloudinary.uploader.upload(req.file.path, function(result) { 
                  //console.log(result)
                  
                  img.img = {
                        url: result.url,
                        path: req.file.path,
                        contentType: req.file.mimetype
                    }
            
                    photo.save((err, data) => {
                        if (err) return res.status(500).json(err)
                        
                        res.status(200).json(data)
                    })
                  
                });
                
        })
        .catch(err => res.status(500).json(err))
    },
    
    showImg: (req, res) => {
        productModel.findById({_id: req.params.id}, (err, data) => {
            if (err) return res.status(500).json(err)
            res.contentType(data.img.contentType)
            res.send(data.img.data)
          })
    },
    
    update: (req, res) => {
        productModel.update({_id: req.params.id}, req.body)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    },
    
    remove: (req, res) => {
        productModel.remove({_id : req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    }
}