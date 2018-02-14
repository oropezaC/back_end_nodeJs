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

function verificarEstatus(data) {
  let rtn = {}
  return new Promise((resolve, reject) => {
    if (data.RespuestaOK != undefined) {
        rtn.estatus = data.RespuestaOK.ESTATUS[0]._;
        rtn.idpeticion = data.RespuestaOK.ESTATUS[0].$.IDPETICION;
        rtn.mensaje = data.RespuestaOK.MENSAJE[0];
        data.RespuestaOK.Errores != undefined ? rtn.errores = data.RespuestaOK.Errores[0] : false;
        data.RespuestaOK.CicloFact != undefined ? rtn.ciclo = data.RespuestaOK.CicloFact[0] : false;
        data.RespuestaOK.EstatusNumero != undefined ? rtn.estatusNumero = data.RespuestaOK.EstatusNumero[0] : false;
        data.RespuestaOK.MontoPagar != undefined ? rtn.MontoPagar = data.RespuestaOK.MontoPagar[0] : false;
        data.RespuestaOK.CuotaCambioPlan != undefined ? rtn.CuotaCambioPlan = data.RespuestaOK.CuotaCambioPlan[0] : false;
        rtn.linea = data.linea
        resolve(rtn)

    }else {
      if (data.RespuestaError.ESTATUS[0]._ == "FALLIDO") {
          rtn.estatus = data.RespuestaError.ESTATUS[0]._;
          data.RespuestaError.MENSAJE != undefined ? rtn.mensaje = data.RespuestaError.MENSAJE[0] : false
          data.RespuestaError.DESCRIPCIONERROR != undefined ? rtn.descripcion = data.RespuestaError.DESCRIPCIONERROR[0] : false
          data.RespuestaError.RETURNCODE != undefined ? rtn.returncode = data.RespuestaError.RETURNCODE[0] : false
          rtn.linea = data.linea
        resolve(rtn)
      }
    }
  })
}

function documentVlid(data,doc) {
  let correctos = []
  let fallidos = []
  return new Promise(function(resolve, reject) {
    if (doc[0] === "B") {
      let tipo = "tipo de grupo"
      let prod = "producto agenda"
      let linea = "línea"
      data.forEach((data)=>{
        data.comentarios == "" || data.línea == "" || data[tipo] == "" ||
        data[prod] == "" || data[linea].length < 10 ? fallidos.push(data) : correctos.push(data);
      })
      resolve({proceso:"Baja de Grupo",correcto:correctos,fallido:fallidos})
    }if (doc[0] === "C" ) {
      let plnAct= "plan actual";
      let plnNw = "plan nuevo";
      let linea = "línea"
      let bonificacion = "Bonificación";
      data.forEach((data)=>{
        data.comentarios == " " || data.línea == " " || data[plnAct] == " " || data[plnAct].length < 5 ||
        data[plnNw] == " " || data[plnNw].length < 5 ||  data[linea].length < 10 ||
        data[bonificacion] == " " ? fallidos.push(data) : correctos.push(data);
      })
      resolve({proceso:"Cambio de Plan",correcto:correctos,fallido:fallidos})
    } else {
      resolve({proceso:"Proceso No Identificado"})
    }
  })
}

module.exports = {
  jsonXml,
  xmlJson,
  cleanResultConsulta,
  verificarEstatus,
  returnData,
  documentVlid
};
