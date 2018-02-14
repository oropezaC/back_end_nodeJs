const helpers = require('../modules/helpers')
const ws = require('../modules/webservice')


function consultaRetusBja(req,res) {
  let data = req.body.data;
  let typeGrp = "tipo de grupo";
  let prodAg = "producto agenda";
  Promise.each(data,(item)=>{
    return new Promise(function(resolve, reject) {
      item.user = "VI9M2KW";
      item.region = "I";
      item.function = "I*0F";
      item.action = "C";
      let linea = item.linea;
      ws.consultaRetus(item)
      .then((result)=>{
        helpers.returnData(result,linea)
        .then((result)=>{
          result.user = "VI9M2KW";
          result.region = "I";
          result.function = "I*U8";
          result.action = "A";
          result.p01accion = "BAJAGPOS"
          result.parametros = result.linea+item[typeGrp]+item[prodAg];
          ws.bajaGroup(result)
          .then((result)=>{
            helpers.returnData(result,linea)
            .then((result)=>{
              resolve(result)
            })
          })
        })
      })
    })
  })
  .then((result)=>{
    res.json({statusCode:202,descripcion:"ok"})
  })
}

module.exports = {
  consultaRetusBja
};
