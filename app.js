const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const config = require('./config/conf')
const path = require('path');
const app = express();

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

const baja_grupo = require('./routes/baja_grupo')
app.use('/baja_grupo',baja_grupo);

app.listen(config.port,function(){
  console.log("listen in :: " + config.port);
})
