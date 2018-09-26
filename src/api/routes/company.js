const companyControllers = require("../controllers/company")
const router = require("express").Router()
const server = require("../../config/server")
const companyModel = require("../models/company")

const authService = require("../middleware/authService")
const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU", "ENCANTADOR"])
const passwordUpdate = require("../middleware/passwordUpdate")

server.use('/api/v1', router)

router.route('/authenticateCompanys')
    .post((req, res) => authService.login(req, res, companyModel))
    
router.route('/companyPasswordUpdate')
    .put([auth, authRole], (req, res) => passwordUpdate(req, res, companyModel))

router.route('/companies')
    .get([auth, authRole], (req, res) => companyControllers.findAll(req, res))
    .post([auth, authRole], (req, res) => companyControllers.create(req, res))
    
router.route('/companies/:id')
    .get([auth, authRole], (req, res) => companyControllers.findById(req, res))
    .put([auth, authRole], (req, res) => companyControllers.update(req, res))
    .delete([auth, authRole], (req, res) => companyControllers.remove(req, res))