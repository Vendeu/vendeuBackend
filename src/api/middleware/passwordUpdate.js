const bcrypt = require("bcrypt")

const passwordHash = (v) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(v, salt)
    return hash
}

module.exports = (req, res, model, next) => {
    const email = req.body.email || ""
    const password = req.body.password || ""
    const newPassword = req.body.newPassword || ""
    
    if(!email) {
        return res.json({ error: ['Email is undefined'] })
    }
    
    if(!password) {
        return res.json({ error: ['Password is undefined'] })
    }
    
    model.findOne({ email }, (err, user) => {
        if(err) {
            
            return res.json(err)
            
        } else if(user && bcrypt.compareSync(password, user.password)) {
            
                if(!newPassword) {
                    return res.json({ error: ['New password is undefined'] })
                    
                } else {
                    
                    const hash = passwordHash(newPassword)
                    
                    model.update({email}, {password: hash}, (err, data) => {
                        if(err) return res.json(err)
                        
                        res.json(data)
                    })
                }
            }
            
        })
    }




