const soap = require('soap');
var parseString = require('xml2js').parseString;

function index(req,res) {
  res.json({msj:'desde el controlador'})
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
          parseString(xml, function (err, result) {
          res.json(result)
      })
      }
    })
  })
}



  module.exports = {index,consultaSoap};
