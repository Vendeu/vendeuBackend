const moipController = require('../controllers/moip')
const router = require('express').Router()
const server = require("../../config/server")

const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU", "ENCANTADOR"])

server.use('/api/v1', router)

router.route('/addOrder')
    .post((req, res) => moipController.addOrder(req, res))

router.route('/addMultiOrder')
    .post((req, res) => moipController.addMultiOrder(req, res))

router.route('/findAllOrders')
    .get((req, res) => moipController.findAllOrders(req, res))

router.route('/findOrder/:orderId')
    .get((req, res) => moipController.findOrder(req, res))

router.route('/createPay/:orderId')
    .post((req, res) => moipController.createPay(req, res))
