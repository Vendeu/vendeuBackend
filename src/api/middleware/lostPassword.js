const bcrypt = require("bcrypt")

module.exports = (req, res, model, next) => {
    const email = req.body.email || ""
    
    if(!email) {
        return res.json({ error: ['Email is undefined'] })
    } else {
        model.findOne({ email }, (err, data) => {
            if (err) {
                
                return res.json({ error: [`${err}`] })
                
            } else {
                
                if (!data) {
                    
                    return res.json("Email não é valido")
                    
                } else {
                    
                    return res.json(bcrypt.genSaltSync())
                    
                    
                }
                
            }
        })
    }
}