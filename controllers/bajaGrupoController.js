const helpers = require('../modules/helpers')
const ws = require('../modules/webservice')


function bajaGroup(req,res) {
  let data = req.body;
  ws.bajaGroup(data)
  .then((result)=>{
    res.json(result)
  })
}


module.exports = {
  bajaGroup
};
