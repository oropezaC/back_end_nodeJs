const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const config = require('./config/conf')
const path = require('path');
const app = express();

Promise = require('bluebird');

app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

const cslt_retus = require('./routes/restus_consultaBaja')
const bajaGroup = require('./routes/baja_grupo')

app.use('/consulta_bajaGrooup',cslt_retus);
app.use('/baja_grupo',bajaGroup);

app.get('/',(req,res)=>{
        res.sendFile(__dirname + "/index.html");
    });

app.listen(config.port,()=>{
  console.log("listen in :: " + config.port);
})
