const xml2js = require('xml2js');

function jsonXml(body) {
  let builder = new xml2js.Builder();
  return builder.buildObject(body);
}


function xmlJson(body) {
  let parser = new xml2js.Parser();
  return new Promise((resolve,reject)=>{
    parser.parseString(body, function (err, result) {
      if (!err) {
        console.log("transformacion xml to json :: Correcta");
        resolve(result)
      }else {
        console.log("transformacion xml to json :: Fallida");
        resolve(err)
      }
    })
  })
}

function cleanResultConsulta(data) {
  return new Promise((resolve, reject) =>{
    let s = "soapenv:Envelope"
    let b = "soapenv:Body"
    let r = "p875:ejecutaServicioResponse"
    let servRtn = "ejecutaServicioReturn"
    let nuevo = data[s][b][0][r][0][servRtn][0];
    resolve(nuevo)
  })
}

module.exports = {
  jsonXml,xmlJson,cleanResultConsulta
};
