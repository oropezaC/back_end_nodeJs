const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const config = require('../config/conf')


function consultaRetus(d) {
  let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.web.m2k.sds.telcel.com">'+
  '<soapenv:Header/>'+
  '<soapenv:Body>'+
  '<ser:ejecutaServicio>'+
  '<xml><![CDATA[<?xml version="1.0" encoding="ISO-8859-1"?>'+
  '<Request>'+
  '<user>'+d.user+'</user>'+
  '<region>'+d.region+'</region>'+
  '<function>'+d.function+'</function>'+
  '<action>'+d.action+'</action>'+
  '<inputParameters>'+
  '<servicio>'+
  '<p01telefono longitud="10">'+d.linea+'</p01telefono>'+
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
            // console.log("webservice retus consulta :: exito")
            resolve(res)
          }else {
            // console.log("webservice retus consulta :: fallido");
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
  // console.log("servicio baja de grupo",d);
  let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servicios.web.m2k.sds.telcel.com">'+
  '<soapenv:Header/>'+
  '<soapenv:Body>'+
  '<ser:ejecutaServicio>'+
  '<xml><![CDATA[<?xml version="1.0" encoding="ISO-8859-1"?>'+
  '<Request>'+
  '<user>'+d.user+'</user>'+
  '<region>'+d.region+'</region>'+
  '<function>'+d.function+'</function>'+
  '<action>'+d.action+'</action>'+
  '<inputParameters>'+
  '<actualiza>'+
  '<p01accion longitud="15">'+d.p01accion+'</p01accion>'+
  '<p02parametros longitud="138">'+d.parametros+'</p02parametros>'+
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
            // console.log("webservice baja grupo:: exito")
            resolve(res)
          }else {
            // console.log("webservice baja grupo :: fallido");
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

function consultaPlan(d) {
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
  '<p02planTarifario longitud="05">'+d.Request.inputParameters.servicio.p02planTarifario+'</p02planTarifario>'+
  '<p03fechaEfectivaPlan longitud="8">'+d.Request.inputParameters.servicio.p03fechaEfectivaPlan+'</p03fechaEfectivaPlan>'+
  '<p06distribuidorAdenum longitud="09">'+d.Request.inputParameters.servicio.p06distribuidorAdenum+'</p06distribuidorAdenum>'+
  '<p07motivo longitud="05">'+d.Request.inputParameters.servicio.p07motivo+'</p07motivo>'+
  '<p08bonificacionSN longitud="01">'+d.Request.inputParameters.servicio.p08bonificacionSN+'</p08bonificacionSN>'+
  '<p09bonificacionPje longitud="03">'+d.Request.inputParameters.servicio.p09bonificacionPje+'</p09bonificacionPje>'+
  '</servicio>'+
  '</inputParameters>'+
  '</Request>'+
  ']]></xml>'+
  '</ser:ejecutaServicio>'+
  '</soapenv:Body>'+
  '</soapenv:Envelope>';
  return new Promise((resolve, reject)=> {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', config.urlWsTelcel, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState==4 && xmlhttp.status == 200) {
        xmlhttp.onload =  function () {
          var res = xmlhttp.responseText;
          if (res) {
            console.log("webservice Consulta Plan :: exito")
            resolve(res)
          }else {
            console.log("webservice Consulta Plan :: fallido");
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
  bajaGroup,
  consultaPlan

};
