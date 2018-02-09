const helpers = require('../modules/helpers')
const ws = require('../modules/webservice')


function bajaGroup(req,res) {
  let data = req.body;
  ws.bajaGroup(data)
  .then((result)=>{
    helpers.xmlJson(result)
    .then((result)=>{
      helpers.cleanResultConsulta(result)
      .then((result)=>{
        helpers.xmlJson(result)
        .then((result)=>{
          res.json(result)
        })
      })
    })
  })
}


module.exports = {
  bajaGroup
};
