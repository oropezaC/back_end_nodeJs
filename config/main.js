conn = null;
oracledb = require('oracledb');

Promise = require('bluebird');

const fs = require('fs');

const orcl_cred = JSON.parse(fs.readFileSync(__dirname + '/oracle_cred'));


function start() {
  return new Promise((resolve, reject) => {
  // var p1 = new Promise((resolve, reject) => {
      // oracledb.getConnection(orcl_cred,(err)=>{
      //   if (err) {
      //     console.log("Ocurrio un error con la Base de Datos",err);
      //     console.log(orcl_cred);
      //     resolve()
      //   }else {
      //     console.log("Conectados con Oracle");
      //     resolve()
      //   }
      // })
      resolve()
    // })

    // Promise.settle([p1])
    // .then((results)=>{
    //   resolve()
    // })

  })
}

module.exports = {
  start
};
