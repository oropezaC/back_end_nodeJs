const xml2js = require('xml2js');

function returnData(data,linea) {
  return new Promise(function(resolve, reject) {
    xmlJson(data)
    .then((result)=>{
      cleanResultConsulta(result)
      .then((result)=>{
        xmlJson(result)
        .then((result)=>{
          result.linea = linea
          verificarEstatus(result)
          .then((result)=>{
            resolve(result)
          })
        })
      })
    })
  })
}

function jsonXml(body) {
  let builder = new xml2js.Builder();
  return builder.buildObject(body);
}


function xmlJson(body) {
  let parser = new xml2js.Parser();
  return new Promise((resolve,reject)=>{
    parser.parseString(body, function (err, result) {
      if (!err) {
        // console.log("transformacion xml to json :: Correcta");
        resolve(result)
      }else {
        // console.log("transformacion xml to json :: Fallida");
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

function verificarEstatus(data) {
  let rtn = {}
  return new Promise((resolve, reject) => {
    if (data.RespuestaOK != undefined) {
      // console.log(data);
        rtn.estatus = data.RespuestaOK.ESTATUS[0]._;
        rtn.idpeticion = data.RespuestaOK.ESTATUS[0].$.IDPETICION;
        rtn.mensaje = data.RespuestaOK.MENSAJE[0];
        data.RespuestaOK.Errores != undefined ? rtn.errores = data.RespuestaOK.Errores[0] : false;
        data.RespuestaOK.CicloFact != undefined ? rtn.ciclo = data.RespuestaOK.CicloFact[0] : false;
        data.RespuestaOK.EstatusNumero != undefined ? rtn.estatusNumero = data.RespuestaOK.EstatusNumero[0] : false;
        rtn.linea = data.linea
        // console.log("por que vergas esto aqui",rtn);
        resolve(rtn)
    }else {
      if (data.RespuestaError.ESTATUS[0]._ == "FALLIDO") {
        // console.log(data);
          rtn.estatus = data.RespuestaError.ESTATUS[0]._;
          // rtn.mensaje = data.RespuestaError.MENSAJE[0];
          data.RespuestaError.MENSAJE != undefined ? rtn.mensaje = data.RespuestaError.MENSAJE[0] : false
          data.RespuestaError.DESCRIPCIONERROR != undefined ? rtn.descripcion = data.RespuestaError.DESCRIPCIONERROR[0] : false
          data.RespuestaError.RETURNCODE != undefined ? rtn.returncode = data.RespuestaError.RETURNCODE[0] : false
          rtn.linea = data.linea
        resolve(rtn)
      }
    }
  })
}

module.exports = {
  jsonXml,
  xmlJson,
  cleanResultConsulta,
  verificarEstatus,
  returnData
};
