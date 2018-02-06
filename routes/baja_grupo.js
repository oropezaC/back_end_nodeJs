const bajaGrupoCtrl = require('../controllers/bajaGrupoController')
const express = require('express')
let router = express.Router();


router.route('/')
  .get(bajaGrupoCtrl.index)
  .post(
    // bajaGrupoCtrl.carga,
    bajaGrupoCtrl.consultaSoap)
    // bajaGrupoCtrl.validParams)

module.exports = router;
