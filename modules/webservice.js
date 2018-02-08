const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const config = require('../config/conf')


function consultaRetus(d) {
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
  return new Promise((resolve,reject)=>{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', config.urlWsTelcel, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
        xmlhttp.onload =  function () {
          var res = xmlhttp.responseText;
          if (res) {
            console.log("webservice retus consulta :: exito")
            resolve(res)
          }else {
            console.log("webservice retus consulta :: fallido");
            resolve(res)
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'ejecutaServicio');
    xmlhttp.send(xml)
  })
}

function bajaGroup(d) {
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
  '<actualiza>'+
  '<p01accion longitud="15">'+d.Request.inputParameters.actualiza.p01accion+'</p01accion>'+
  '<p02parametros longitud="138">'+d.Request.inputParameters.actualiza.p02parametros+'</p02parametros>'+
  '</actualiza>'+
  '</inputParameters>'+
  '</Request>'+
  ']]></xml>'+
  '</ser:ejecutaServicio>'+
  '</soapenv:Body>'+
  '</soapenv:Envelope>';
  return new Promise((resolve,reject)=>{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', config.urlWsTelcel, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
        xmlhttp.onload =  function () {
          var res = xmlhttp.responseText;
          if (res) {
            console.log("webservice baja grupo:: exito")
            resolve(res)
          }else {
            console.log("webservice baja grupo :: fallido");
            resolve(res)
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'ejecutaServicio');
    xmlhttp.send(xml)
  })
}


module.exports = {
  consultaRetus,
  bajaGroup

};
