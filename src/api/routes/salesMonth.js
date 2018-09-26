const salesMonthControllers = require("../controllers/salesMonth")
const router = require("express").Router()
const server = require("../../config/server")
const vendeuModel = require("../models/vendeu")

const authService = require("../middleware/authService")
const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU"])

server.use('/api/v1', router)

router.route('/authenticate')
    .post((req, res) => authService.login(req, res, vendeuModel))
    
router.route('/salesCompany/:company')
    .get((req, res) => salesMonthControllers.findAllByCompanies(req, res))

router.route('/salesAgent/:agent')
    .get((req, res) => salesMonthControllers.findAllByAgents(req, res))

router.route('/sales')
    .get((req, res) => salesMonthControllers.findAll(req, res))
    .post((req, res) => salesMonthControllers.create(req, res))
    .delete([auth, authRole], (req, res) => salesMonthControllers.removeAll(req, res))
    
router.route('/sales/:id')
    .get([auth, authRole], (req, res) => salesMonthControllers.findById(req, res))
    .put([auth, authRole], (req, res) => salesMonthControllers.update(req, res))
    .delete([auth, authRole], (req, res) => salesMonthControllers.remove(req, res))