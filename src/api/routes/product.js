const productControllers = require("../controllers/product")
const router = require("express").Router()
const server = require("../../config/server")
const multer = require("multer")
const path = require("path")

const authService = require("../middleware/authService")
const auth = require("../middleware/auth")
const authRole = require("../middleware/authRole")(["VENDEU", "EMPRESA", "REPRESENTANTE"])

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
  }
})

const upload = multer({ storage: storage })

server.use('/api/v1', router)

router.route('/products')
    .post([auth, authRole], (req, res) => productControllers.createProduct(req, res))
    .get([auth, authRole], (req, res) => productControllers.findAll(req, res))

router.route('/products/:id')
    .get([auth, authRole], (req, res) => productControllers.findById(req, res))
    .put([auth, authRole], (req, res) => productControllers.update(req, res))
    .delete([auth, authRole], (req, res) => productControllers.remove(req, res))

router.route('/photo/:id')
    .put([auth, authRole ,upload.single('img')], (req, res) => productControllers.insertImg(req, res))
    .get((req, res) => productControllers.showImg(req, res))

router.route('/product/:postedBy')
    .get([auth, authRole], (req, res) => productControllers.findAllByCompanies(req, res))