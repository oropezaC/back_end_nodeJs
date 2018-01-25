var excel2json = require("excel-to-json");
const upload = require('../config/upload')
var fs = require("fs");


function index(req,res) {
  res.json({msj:'desde el controlador'})
}

function consultaRetus(req,res) {
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    upload(req,res,function(err){
      var error=0;
      if(err){
        res.json({err:true,descripcion:"fallo a"});
        error++;
      }
      if(!file){
        res.json({err:true,descripcion:"fallo b"});
        error++;
      }
      if (error==0){
        console.log("ok");

      }
    })
  })
};



  module.exports = {index,consultaRetus};
