var tensorflow = require('../tensorflow/tensorflow.js');

const multer = require("multer");

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

var mongoose = require("mongoose");
var fs = require("fs");

mongoose.connect('mongodb://localhost/whldb', {useNewUrlParser: true});

var load_file = require('../picking/load_file.js');

fs.readFile('./src/express/data/csv/picktoPart.csv', function(err, data) {
  load_file.load_file(data); 
});

var express = require('express');

module.exports = (app) => {
	app.post('/api/image', upload.single("image"), (req, res) => {
		const tempPath = req.file.path
		tensorflow.init(tempPath, res);
  });

  app.get('/api/orders/:id', (req, res) => {
    orders = []
    load_file.PickingFile.find({usuario: req.params.id}).exec(function (err, found_orders) {
      found_orders.map(order => {        
        orders.push({id_pedido: order["pedido"], medio: order["medio"]});
      });
      return res.end(JSON.stringify(orders));
    });
  });
};

