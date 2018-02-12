const upload = require('../config/upload')
const xlstojson  = require('xls-to-json-lc');
const xlsxtojson = require('xlsx-to-json-lc');
const multer = require('multer')


let data = []
let correctos = []
let fallidos = []

function layoutBajaGrupo(req,res) {
  var exceltojson;
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    if(!req.file){
      res.json({error_code:1,err_desc:"No file passed"});
      return;
    }
    if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    try {
      exceltojson({
        input: req.file.path,
        output: null,
        lowerCaseHeaders:true
      }, function(err,result){
        if(err) {
          return res.json({error_code:1,err_desc:err, data: null});
        }
        console.log(req.file.originalname);
        data.push(result)
        let d = data[0];
        let tipo = "tipo de grupo"
        let prod = "producto agenda:"
        d.forEach((d)=>{
        d.comentarios == "" || d.línea == "" || d[tipo] == "" || d[prod] == "" || d.línea.length < 10? fallidos.push(d) : correctos.push(d);
        })
        res.json({correcto:correctos,fallido:fallidos})
      });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  })
}

module.exports = {
  layoutBajaGrupo
};
