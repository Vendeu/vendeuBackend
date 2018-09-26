const charmerControllers = require("../controllers/charmer")
const router = require("express").Router()
const server = require("../../config/server")
const charmerModel = require("../models/charmer")

const authService = require("../middleware/authService")
const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU"])
const passwordUpdate = require("../middleware/passwordUpdate")

server.use('/api/v1', router)

router.route('/authenticateCharmers')
    .post((req, res) => authService.login(req, res, agentModel))

router.route('/CharmersPasswordUpdate')
    .put([auth, authRole], (req, res) => passwordUpdate(req, res, agentModel))

router.route('/charmers')
    .get([auth, authRole], (req, res) => charmerControllers.findAll(req, res))
    .post([auth, authRole], (req, res) => charmerControllers.create(req, res))
    
router.route('/charmers/:id')
    .get([auth, authRole], (req, res) => charmerControllers.findById(req, res))
    .put([auth, authRole], (req, res) => charmerControllers.update(req, res))
    .delete([auth, authRole], (req, res) => charmerControllers.remove(req, res))
