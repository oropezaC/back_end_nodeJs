const helpers = require('../modules/helpers')
const ws = require('../modules/webservice')
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
  let obj = {
		"Request":{
    		"user":"VI9M2KW",
    		"region":"I",
    		"function":"I*0F",
    		"action":"C",
    		"inputParameters":{
        	"servicio":{
        		"p01telefono":5554220502
        		}
    		}
    	}
}
  let data = helpers.jsonXml(obj)
  res.send(data);

}


function consultaRetusBja(req,res) {
  let args = req.body;
  ws.consultaRetus(args)
  .then((result) => {
    helpers.xmlJson(result)
    .then((result)=>{
      helpers.cleanResultConsulta(result)
      .then((result)=>{
        res.json(result)
      })
    })
  })
}

module.exports = {
  index,
  carga,
  validParams,
  consultaRetusBja
};
