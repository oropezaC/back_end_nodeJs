const bajaGroupCtrl = require('../controllers/bajaGrupocontroller')
const express = require('express')
let router = express.Router();

router.route('/')
  .post(bajaGroupCtrl.consultaRetusBja)


module.exports = router;
