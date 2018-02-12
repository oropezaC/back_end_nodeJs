const helpers = require('../modules/helpers')
const ws = require('../modules/webservice')


function consultaRetusBja(req,res) {
  let data = req.body;
  let baja = data.data;
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
        // console.log(result);
        if (result.estatus == "EXITO") {
          console.log("baja grupo");
        }else{
          console.log("error");
        }
      })
    })
  })
}

module.exports = {
  consultaRetusBja
};
