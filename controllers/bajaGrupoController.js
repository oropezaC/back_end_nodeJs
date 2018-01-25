const soap = require('soap');
const xml2js = require('xml2js');

// excel
const upload = require('../config/upload')
const xlstojson  = require('xls-to-json-lc');
const xlsxtojson = require('xlsx-to-json-lc');
const multer = require('multer')

function carga(req,res) {
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
        res.json({data: result});
      });
    } catch (e){
      res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  })
}

function index(req,res) {
  // let  obj  = { nombre : " Super " ,  Apellido : " Hombre " ,  edad : 23 } ;
  // let builder = new xml2js.Builder();
  // let xml = builder.buildObject(obj);
  // res.send(xml);


}

function consultaSoap(req,res) {
  let url = 'http://www.webservicex.com/globalweather.asmx?wsdl';
  var args = req.body;
  soap.createClient(url,function (err,client) {
    client.GetCitiesByCountry(args,function (err,soapResult,body) {
      if (err) {
        res.json(err)
      }else {
        let xml = soapResult.GetCitiesByCountryResult;
        xml2js.parseString(xml, function (err, result) {
          let data = result.NewDataSet.Table;
          for (var i = 0; i < data.length; i++) {
            console.log("Country: " + data[i].Country + " City: " + data[i].City);
          }
          res.json(data)
        })
      }
    })
  })
}

// consultaSoap
module.exports = {index,carga};
