const ws = require('../modules/webservice')
const helpers = require('../modules/helpers')

let datos;
function consultaPlan(req,res,next) {
  let data = req.body;
  ws.consultaPlan(data)
  .then((result)=>{
    datos = result
    next()
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
  consultaPlan,
  conversion
};
