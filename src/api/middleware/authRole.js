module.exports = (roles) => {
    return (req, res, next) => {
    
        const role = req.user._doc.role || ''
        
        if(!role) {
            return res.status(403).send({ erros : ['No role provided.'] })
        }
        
        if (roles.indexOf(role) !== -1) {
            next()
        } else {
            return res.status(403).send({ erros : ['Você não tem permição suficiente para este conteudo!'] })
        }
    }
}

