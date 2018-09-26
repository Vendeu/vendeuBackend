const agentControllers = require("../controllers/agent")
const router = require("express").Router()
const server = require("../../config/server")
const agentModel = require("../models/agent")

const authService = require("../middleware/authService")
const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU", "ENCANTADOR"])
const passwordUpdate = require("../middleware/passwordUpdate")

server.use('/api/v1', router)

router.route('/authenticateAgents')
    .post((req, res) => authService.login(req, res, agentModel))

router.route('/agentPasswordUpdate')
    .put([auth, authRole], (req, res) => passwordUpdate(req, res, agentModel))

router.route('/agents')
    .get([auth, authRole], (req, res) => agentControllers.findAll(req, res))
    .post([auth, authRole], (req, res) => agentControllers.create(req, res))
    
router.route('/agents/:id')
    .get([auth, authRole], (req, res) => agentControllers.findById(req, res))
    .put([auth, authRole], (req, res) => agentControllers.update(req, res))
    .delete([auth, authRole], (req, res) => agentControllers.remove(req, res))

router.route('/agent/:charmer')
    .get([auth, authRole], (req, res) => agentControllers.findAllByCharmers(req, res))