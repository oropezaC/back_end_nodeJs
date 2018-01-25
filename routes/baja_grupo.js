const express = require('express')

let router = express.Router();

const bajaGrupoCtrl = require('../controllers/bajaGrupoController')

router.route('/')
  .get(bajaGrupoCtrl.index)
  .post(bajaGrupoCtrl.consultaRetus)

module.exports = router;
