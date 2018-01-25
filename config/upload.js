const multer = require('multer')
const path = require ('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
		console.log("archivo",file);

		cb(null, './uploads')
	},
	filename: 'archivo'
});

var upload = multer({
  storage: storage,
  fileFilter : function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.xlsx') {
      return callback(new Error('Wrong extension type'))
    }
    callback(null, true);
  }
}).single('file');

module.exports = upload;
