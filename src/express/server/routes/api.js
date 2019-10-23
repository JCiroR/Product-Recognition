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

var bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.json());

	app.post('/api/image', upload.single("image"), (req, res) => {
		const tempPath = req.file.path
		tensorflow.init(tempPath, res);
  });

  app.post('/api/validate_photo/', (req, res) => {
    //TODO Implementar este método
    var rand = Math.floor(Math.random() * (10 + 1))
    var response;
    if (rand % 2 == 0) {
      response = {status: 'MATCH'}
    } else {
      response = {status: 'ERROR'}
    }
    res.end(JSON.stringify(response))
  });

  app.post('/api/new_medium/', (req, res) => {
    var query = {pedido: req.body["id_pedido"]}
    var update = {medio: req.body["nuevo_medio"]}
    load_file.PickingFile.updateOne(query, { $set: update}).exec()
    res.sendStatus(200);
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

  app.get('/api/next_product/:id_pedido', (req, res) => {
    var response = {
      posicion: "A-C2-N4",
      referencia: "123123522",
      descripcion: "pieza roja",
      cantidad: "3"
    }
    res.end(JSON.stringify(response))
  });
};

