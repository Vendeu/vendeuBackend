const server = require("../../config/server")
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendErrorsFromDB = (res, dbErros) => {
    const erros = []
    _.forIn(dbErros.erros, error => erros.push(error.message))
    return res.status(400).json({ erros })
}

const login = (req, res, model, next) => {
    
    const email = req.body.email || ''
    const password = req.body.password || ''
    
    model.findOne({email}, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, server.get('superSecret'), {
                expiresIn: "1 day"
            })
            res.json({
                id: user._id,
                name: user.name, 
                email: user.email,
                role: user.role,
                token: token
            })
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''

    jwt.verify(token, server.get('superSecret'), function (err, decode) {
        return res.status(200).send({ valid: !err })
    })
}


module.exports = { login, validateToken }