const helpers = require('../modules/helpers')
const ws = require('../modules/webservice')


function consultaRetusBja(req,res) {
  let data = req.body;
  let baja = data.data;
  let typeGrp = "tipo de grupo";
  let prodAg = "producto agenda";
  baja.forEach((item)=>{
    item.user = "VI9M2KW";
    item.region = "I";
    item.function = "I*0F";
    item.action = "C";
    let linea = item.linea;
    ws.consultaRetus(item)
    .then((result)=>{
      helpers.returnData(result,linea)
      .then((result)=>{
          if (result.estatus == "EXITO") {
          result.user = "VI9M2KW";
          result.region = "I";
          result.function = "I*U8";
          result.action = "A";
          result.p01accion = "BAJAGPOS"
          result.parametros = result.linea+item[typeGrp]+item[prodAg]
          ws.bajaGroup(result)
          .then((result)=>{
            helpers.returnData(result,linea)
            .then((result)=>{
              console.log(result);
            })
          })
        }else{
          console.log("Error de Consulta");
        }
      })
    })
  })
}

module.exports = {
  consultaRetusBja
};
