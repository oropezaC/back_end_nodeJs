const xml2js = require('xml2js');
const soap = require('soap');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function jsonXml(body) {
  let builder = new xml2js.Builder();
  return xml = builder.buildObject(body);
}

// function ejecutaServicio() {
//   // let xml = jsonXml(d)
//   let url = 'http://191.9.3.34:9085/telcel-ws-web-1.0.0-Telcel-01/services/ControlWebService?wsdl';
//   return new Promise((resolve,reject) => {
//       soap.createClient(url,(err,client)=> {
//         client.ejecutaServicio(xml,(err,result,body)=> {
//           if (!err) {
//             // console.log("Operacion Exitosa");
//             resolve({operacion:"Exitosa",result:result,data:xml})
//           }else {
//             // console.log("Operacion Fallida");
//             resolve({operacion:"Fallida",error:err})
//           }
//         })
//       })
//   })
// }

function ejecutaServicio() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://191.9.3.34:9085/telcel-ws-web-1.0.0-Telcel-01/services/ControlWebService', true);
  xmlhttp.onreadystatechange = function () {
    console.log("onreadystatechange ");
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        console.log('done. use firebug/console to see network response');
      }
    }
  }
  // Send the POST request
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  let uri = xmlhttp.send(xml);
  console.log("aqui",uri);

}



let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.web.m2k.sds.telcel.com">\
            <soapenv:Header/>\
            <soapenv:Body>\
            <ser:ejecutaServicio>\
            <xml><![CDATA[<?xml version="1.0" encoding="ISO-8859-1"?><Request><user>VI9M2KW</user><region>I</region>\
              <function>I*15</function><action>C</action>\
              <inputParameters><servicio><p01telefono longitud="10">5554220502</p01telefono></servicio>\
              </inputParameters>\
              </Request>\
            ]]></xml>\
            </ser:ejecutaServicio>\
          </soapenv:Body>\
        </soapenv:Envelope>';

module.exports = {
  jsonXml,ejecutaServicio
};
