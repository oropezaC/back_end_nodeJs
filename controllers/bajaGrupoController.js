const soap = require('soap');
const xml2js = require('xml2js');

function index(req,res) {
    let  obj  = { nombre : " Super " ,  Apellido : " Hombre " ,  edad : 23 } ;
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(obj);
    res.send(xml);
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

  module.exports = {index,consultaSoap};
