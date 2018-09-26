const clientControllers = require("../controllers/client")
const router = require("express").Router()
const server = require("../../config/server")
const vendeuModel = require("../models/vendeu")

const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU", "REPRESENTANTE"])

server.use('/api/v1', router)

router.route('/clients')
    .get([auth, authRole], (req, res) => clientControllers.findAll(req, res))
    .post([auth, authRole], (req, res) => clientControllers.create(req, res))
    
router.route('/clients/:id')
    .get([auth, authRole], (req, res) => clientControllers.findById(req, res))
    .put([auth, authRole], (req, res) => clientControllers.update(req, res))
    .delete([auth, authRole], (req, res) => clientControllers.remove(req, res))