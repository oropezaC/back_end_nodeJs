const helpers = require('../modules/helpers')
// excel
const upload = require('../config/upload')
const xlstojson  = require('xls-to-json-lc');
const xlsxtojson = require('xlsx-to-json-lc');
const multer = require('multer')


let data = []

function carga(req,res,next) {
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
        // res.json({data: result});
        data.push(result)
        // console.log(result);
        next();
      });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  })
}

function validParams(req,res) {
  console.log("data xls",data);
  console.log("result soap", soapR[0].length);
}

function index(req,res) {
  let  obj  = { nombre : " Super " ,  Apellido : " Hombre " ,  edad : 23 } ;
  let data = helpers.jsonXml(obj)
  res.send(data);
}


function consultaSoap(req,res) {
  let args = req.body;
  console.log("args");
  helpers.ejecutaServicio(args)
  // .then((result) => {
  //   // console.log(result.data);
  //   res.json(result.data)
  // }).catch((err)=>{
  //   res.json(err)
  // })
}

module.exports = {index,carga,validParams,consultaSoap};
