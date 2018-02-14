const ws = require('../modules/webservice')
const helpers = require('../modules/helpers')

let datos;
function consultaPlan(req,res) {
  let data = req.body.data;
  let planActl = "plan actual";
  let fecha = "16/02/18"
  let dist = "POLANCO"
  let mtv = "CAPPR"
  let bn = "S"
  Promise.each(data,(item)=>{
    return new Promise(function(resolve, reject) {
      item.user = "VI9M2KW";
      item.region = "I";
      item.function = "I*0F";
      item.action = "H";
      let linea = item.linea;
      item.fecha = fecha;
      item.planActl = item[planActl];
      item.dist = dist
      item.mtv = mtv;
      item.bn = bn;
      ws.consultaPlan(item)
      .then((result)=>{
        helpers.returnData(result,linea)
        .then((result)=>{
            console.log(result);
          // res.json(result)
          resolve(result)
        })
      })
    })
  })
  .then((result)=>{
    // console.log(result);
    res.json({statusCode:202,descripcion:"ok"})
  })
}

function conversion(req,res) {
  helpers.xmlJson(datos)
  .then((result)=>{
    helpers.cleanResultConsulta(result)
    .then((result)=>{
      helpers.xmlJson(result)
      .then((result)=>{
        res.json(result)
      })
    })
  })
}

module.exports = {
  consultaPlan
};
