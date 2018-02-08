const consultaRetusBajaGroupCtrl = require('../controllers/consultaRetusBajaGroupController')
const express = require('express')
let router = express.Router();


router.route('/')
  .get(consultaRetusBajaGroupCtrl.index)
  .post(consultaRetusBajaGroupCtrl.consultaRetusBja)

module.exports = router;
