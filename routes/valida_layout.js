const validaLayoutCtrl = require('../controllers/layoutController')
const express = require('express')
const router = express.Router();


router.route('/')
  .post(validaLayoutCtrl.layoutBajaGrupo)



  module.exports = router;
