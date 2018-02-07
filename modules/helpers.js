const xml2js = require('xml2js');
const soap = require('soap');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function jsonXml(body) {
  let builder = new xml2js.Builder();
  return xml = builder.buildObject(body);
}

// function ejecutaSW(d) {
//   let url = 'http://191.9.3.34:9085/telcel-ws-web-1.0.0-Telcel-01/services/ControlWebService?WSDL';
//   return new Promise((resolve,reject) => {
//     soap.createClient(url,(err,client)=> {
//       if (!err) {
//         client.ejecutaServicio(xml,(err,result,body)=> {
//           if (!err) {
//             console.log("Operacion Exitosa");
//             resolve({result:result,data:xml})
//           }else {
//             console.log("Operacion Fallida");
//             resolve(err)
//           }
//         })
//       }else {
//         console.log("error");
//       }
//     })
//   })
// }

function ejecutaSW(d) {
  let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.web.m2k.sds.telcel.com">'+
  '<soapenv:Header/>'+
  '<soapenv:Body>'+
  '<ser:ejecutaServicio>'+
  '<xml><![CDATA[<?xml version="1.0" encoding="ISO-8859-1"?>'+
  '<Request>'+
  '<user>'+d.Request.user+'</user>'+
  '<region>'+d.Request.region+'</region>'+
  '<function>'+d.Request.function+'</function>'+
  '<action>'+d.Request.action+'</action>'+
  '<inputParameters>'+
  '<servicio>'+
  '<p01telefono longitud="10">'+d.Request.inputParameters.servicio.p01telefono+'</p01telefono>'+
  '</servicio>'+
  '</inputParameters>'+
  '</Request>'+
  ']]></xml>'+
  '</ser:ejecutaServicio>'+
  '</soapenv:Body>'+
  '</soapenv:Envelope>';
  console.log(xml);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://191.9.3.34:9085/telcel-ws-web-1.0.0-Telcel-01/services/ControlWebService', true);
  xmlhttp.onreadystatechange = function () {
    console.log("aqui estoy",xmlhttp);
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      apply(function () {
        var res = JSON.parse(xmlhttp.responseText);
        if (!res) {
          console.log("exito");
        }else {
          console.log("fallido");
        }
      })
    }
  }
  xmlhttp.send(xml)
//   xmlhttp.setRequestHeader('Content-Type', 'text/xml');
//   return new Promise((resolve,reject)=>{
//   xmlhttp.send(xml,(err,result)=>{
//     if (!err) {
//       console.log(result);
//     }else {
//       console.log(err);
//     }
//   })
// })


}


// let xml = '<Request>'+
//             '<user>VI9M2KW</user>'+
//             '<region>I</region>'+
//               '<function>I*0F</function>'+
//               '<action>C</action>'+
//               '<inputParameters>'+
//               '<servicio>'+
//               '<p01telefono>5554220502</p01telefono>'+
//               '</servicio>'+
//               '</inputParameters>'+
//               '</Request>';

module.exports = {
  jsonXml,ejecutaSW
};
