const vendeuControllers = require("../controllers/vendeu")
const router = require("express").Router()
const server = require("../../config/server")
const vendeuModel = require("../models/vendeu")

const authService = require("../middleware/authService")
const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU"])
const passwordUpdate = require("../middleware/passwordUpdate")

const lostPassword = require("../middleware/lostPassword")

server.use('/api/v1', router)

router.route('/authenticate')
    .post((req, res) => authService.login(req, res, vendeuModel))

router.route('/vendeuPasswordUpdate')
    .put([auth, authRole], (req, res) => passwordUpdate(req, res, vendeuModel))

// router.route('/vendeuLostPassword')
//     .put((req, res) => lostPassword(req, res, vendeuModel))

router.route('/vendeus')
    .get([auth, authRole], (req, res) => vendeuControllers.findAll(req, res))
    .post([auth, authRole], (req, res) => vendeuControllers.create(req, res))
    
router.route('/vendeus/:id')
    .get([auth, authRole], (req, res) => vendeuControllers.findById(req, res))
    .put([auth, authRole], (req, res) => vendeuControllers.update(req, res))
    .delete([auth, authRole], (req, res) => vendeuControllers.remove(req, res))