const jwt = require('jsonwebtoken')
const server = require('../../config/server')

module.exports = (req, res, next) => {
    //CORS preflight request
    if (req.methods === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization']

        if(!token) {
            return res.status(403).send({ erros : ['No token provided.'] })
        }

        jwt.verify(token, server.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to athenticate token.']
                })
            } else {
                req.user = decoded
                next()
            }
        })
    }
}