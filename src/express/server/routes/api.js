var tensorflow = require('../tensorflow/tensorflow.js');

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////DOCUMENTOS//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


const multer = require("multer");
var fs = require('fs');
const path = require('path');

var upload = multer({ storage: multer.diskStorage({

    destination: "./uploaded/files",

    filename: function (req, file, cb) {
      var ext = require('path').extname(file.originalname);
      ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
      require('crypto').pseudoRandomBytes(16, function (err, raw) {
        cb(null, (err ? undefined : raw.toString('hex') ) + ext);
      });
    }

})});


module.exports = (app) => {
	// Ruta inicial
	app.get('/api', (req, res) => {
		console.log(__dirname)
		res.sendFile('uploadfile.html', {root: __dirname});
	});

	app.post('/api/image', upload.single("image"), (req, res) => {
		const tempPath = req.file.path
		tensorflow.init(tempPath, res);
	});

};
